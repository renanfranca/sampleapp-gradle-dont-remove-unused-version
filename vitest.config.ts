/// <reference types="vitest" />

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src/main/webapp/app') }],
  },
  test: {
    reporters: ['verbose', 'vitest-sonar-reporter'],
    outputFile: {
      'vitest-sonar-reporter': 'build/test-results/TESTS-results-sonar.xml',
    },
    globals: true,
    logHeapUsage: true,
    poolOptions: {
      threads: {
        minThreads: 1,
        maxThreads: 2,
      },
    },
    environment: 'jsdom',
    cache: false,
    include: ['src/test/javascript/spec/**/*.(spec|test).(ts|tsx)'],
    exclude: ['node_modules', 'src/test/javascript/integration/**/*.spec.ts'],
    coverage: {
      thresholds: {
        perFile: true,
        autoUpdate: true,
        100: true,
      },
      exclude: ['src/main/webapp/**/*.component.ts', 'src/main/webapp/app/main.ts', '.eslintrc.cjs', '.lintstagedrc.cjs', 'src/test/**/*', 'build/**'],
      provider: 'istanbul',
      reportsDirectory: 'build/test-results/',
      reporter: ['html', 'json-summary', 'text', 'text-summary', 'lcov', 'clover'],
      watermarks: {
        statements: [100, 100],
        branches: [100, 100],
        functions: [100, 100],
        lines: [100, 100],
      },
    },
  },
});
