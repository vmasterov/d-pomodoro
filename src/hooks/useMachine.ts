import { useEffect, useState } from 'react';
import type { TSnapshot } from '@core/types/snapshot.type';
import { loadSnapshot, saveSnapshot } from '@storage/index';
import { isRangeOver } from '@core/selectors/selectors';
import { reduce } from '@core/reduce';
import { eventType } from '@core/constants/events.const';
import { machineState } from '@core/constants/machine.const';
import type { TEvent } from '@core/types/events.type';
import type { TRestKind } from '@core/types/common.type';
import type { TUseMachineReturn } from '@/types/useMachineReturn.type';

export function useMachine(): TUseMachineReturn {
  const getNowMs = () => Date.now();

  const [nowMs, setNowMs] = useState<number>(() => getNowMs());
  const [snapshot, setSnapshot] = useState<TSnapshot | null>(null);

  const commit = (snapshot: TSnapshot) => {
    setSnapshot(snapshot);
    void saveSnapshot(snapshot);
  };

  const dispatcher = (event: TEvent) => {
    if (!snapshot) {
      return;
    }

    const newSnapshot = reduce(snapshot, event, getNowMs());
    commit(newSnapshot);
  };

  const setupStart = (startTimestamp: number, endTimestamp: number) => {
    dispatcher({
      type: eventType.SETUP_START,
      startTimestamp,
      endTimestamp,
    });
  };
  const reset = () => {
    dispatcher({
      type: eventType.RESET,
    });
  };
  const workStart = () => {
    dispatcher({
      type: eventType.WORK_START,
    });
  };
  const restStart = (restKind: TRestKind) => {
    dispatcher({
      type: eventType.REST_START,
      restKind,
    });
  };
  const finish = () => {
    dispatcher({
      type: eventType.RANGE_FINISH,
    });
  };
  const finishConfirm = () => {
    dispatcher({
      type: eventType.FINISH_CONFIRM,
    });
  };

  // TODO: вынести в core/selectors, потому что это утверждение о домене
  const getActiveRangeEnd = (snapshot: TSnapshot | null) => {
    if (
      !snapshot ||
      snapshot.state === machineState.FINISHED ||
      snapshot.state === machineState.SETUP
    ) {
      return null;
    }

    return snapshot.rangeEnd;
  };

  const startTimer = (rangeEnd: number) =>
    setInterval(() => {
      if (isRangeOver(rangeEnd, getNowMs())) {
        finish();
      }

      setNowMs(getNowMs());
    }, 1000);

  const initSnapshotState = async () => {
    const storageSnapshot = await loadSnapshot();

    if (!storageSnapshot) {
      commit({ state: machineState.SETUP });
      return;
    }

    const activeRangeEnd = getActiveRangeEnd(storageSnapshot);
    const isRangeFinish = Boolean(activeRangeEnd && isRangeOver(activeRangeEnd, getNowMs()));

    if (isRangeFinish) {
      const finishSnapshot = reduce(storageSnapshot, { type: eventType.RANGE_FINISH }, getNowMs());
      commit(finishSnapshot);
      return;
    }

    setSnapshot(storageSnapshot);
  };

  useEffect(() => {
    void initSnapshotState();
  }, []);

  useEffect(() => {
    const activeRangeEnd = getActiveRangeEnd(snapshot);
    let timerId = null;

    if (activeRangeEnd !== null) {
      timerId = startTimer(activeRangeEnd);
    }

    return () => clearInterval(timerId);
  }, [snapshot]);

  return {
    snapshot,
    nowMs,
    setupStart,
    reset,
    workStart,
    restStart,
    finishConfirm,
  };
}
