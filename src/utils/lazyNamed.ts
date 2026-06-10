import { lazy, type ComponentType } from 'react';

export const lazyNamed = <
  Module extends Record<string, ComponentType<unknown>>,
  Key extends keyof Module,
>(
  loader: () => Promise<Module>,
  exportName: Key,
) =>
  lazy(() =>
    loader().then((module) => ({
      default: module[exportName] as ComponentType<unknown>,
    })),
  );
