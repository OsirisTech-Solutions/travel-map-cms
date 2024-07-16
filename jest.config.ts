import { configUmiAlias, createConfig } from '@umijs/max/test';
import { Config } from '@jest/types';
export default async () => {
  const config: Config.InitialOptions = await configUmiAlias({
    ...createConfig({
      target: 'browser',
    }),
  });
  console.log(JSON.stringify(config));

  return {
    ...config,
    testEnvironmentOptions: {
      ...(config?.testEnvironmentOptions || {}),
      url: 'http://localhost:8000',
    },
    setupFiles: [...(config.setupFiles || []), './tests/setupTests.jsx'],
    globals: {
      ...config.globals,
      localStorage: null,
    },
  };
};
