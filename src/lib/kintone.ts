import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import type { KintoneNoticeRecord, Notice } from '../types/notice';

// 環境変数のチェック
const baseUrl = import.meta.env.KINTONE_BASE_URL;
const apiToken = import.meta.env.KINTONE_API_TOKEN;
const appId = import.meta.env.KINTONE_APP_ID;

if (!baseUrl || !apiToken || !appId) {
    // ビルド時にエラーを出して通知する
    console.warn('KINTONE_BASE_URL, KINTONE_API_TOKEN, or KINTONE_APP_ID is not set. Data fetching will fail.');
}

const client = new KintoneRestAPIClient({
    baseUrl: baseUrl,
    auth: {
        apiToken: apiToken,
    },
});

export const getNotices = async (): Promise<Notice[]> => {
    if (!appId) return [];

    try {
        const records = await client.record.getAllRecords({
            app: appId,
            orderBy: 'publishedAt desc, $id desc',
            // 必要に応じてconditionを追加（例: 公開フラグなど）
        }) as unknown as KintoneNoticeRecord[];

        return records.map(record => ({
            id: record.$id.value,
            title: record.title.value,
            content: record.content.value,
            category: record.category.value,
            publishedAt: record.publishedAt.value
        }));
    } catch (error) {
        console.error('Failed to fetch records from Kintone:', error);
        return [];
    }
};

export const getNoticeById = async (id: string): Promise<Notice | null> => {
    if (!appId) return null;

    try {
        const record = await client.record.getRecord({
            app: appId,
            id: id,
        }) as unknown as { record: KintoneNoticeRecord };

        return {
            id: record.record.$id.value,
            title: record.record.title.value,
            content: record.record.content.value,
            category: record.record.category.value,
            publishedAt: record.record.publishedAt.value
        };
    } catch (error) {
        console.error(`Failed to fetch record ${id} from Kintone:`, error);
        return null;
    }
};
