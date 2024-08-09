import { join } from 'node:path';
import { parseContextFromWebPage } from '@/common/utils';
import { describe, expect, it } from 'vitest';
import { launchPage } from './puppeteer/utils';

const pagePath = join(__dirname, './fixtures/extractor.html');
describe.skipIf(typeof process.env.CI !== 'undefined')('extractor', () => {
  it('basic', async () => {
    const page = await launchPage(`file://${pagePath}`);

    const { content } = await parseContextFromWebPage(page);
    const list = content.map((item) => {
      return {
        content: item.content,
        attributes: item.attributes,
      };
    });
    expect(list).toMatchSnapshot();
  });
});
