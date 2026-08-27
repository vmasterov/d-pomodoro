import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useMachine } from '@/hooks/useMachine';
import type { TSnapshot } from '@core/types/snapshot.type';
import { machineState } from '@core/constants/machine.const';
import { Setup } from '@/screens/Setup';
import { ActivityIndicator } from 'react-native';
import { Pending } from '@/screens/Pending';
import { Rest } from '@/screens/Rest';
import { Work } from '@/screens/Work';
import { Finished } from '@/screens/Finished';

export default function App() {
  const { snapshot, nowMs, setupStart, reset, workStart, restStart, finishConfirm } = useMachine();

  const showScreen = (snapshot: TSnapshot | null) => {
    if (!snapshot) {
      return <ActivityIndicator />;
    }

    switch (snapshot.state) {
      case machineState.SETUP: {
        return <Setup setupStart={setupStart} />;
      }
      case machineState.PENDING: {
        return (
          <Pending
            nowMs={nowMs}
            rangeStart={snapshot.rangeStart}
            reset={reset}
            workStart={workStart}
          />
        );
      }
      case machineState.WORK: {
        return <Work restStart={restStart} reset={reset} nowMs={nowMs} snapshot={snapshot} />;
      }
      case machineState.REST: {
        return <Rest workStart={workStart} />;
      }
      case machineState.FINISHED: {
        return <Finished finishConfirm={finishConfirm} />;
      }
      default: {
        const _exhaustive: never = snapshot;
        return <ActivityIndicator />;
      }
    }
  };

  return <SafeAreaProvider>{showScreen(snapshot)}</SafeAreaProvider>;
}
