export interface KintoneNoticeRecord {
    $id: { value: string };
    title: { value: string };
    content: { value: string };
    category: { value: string };
    publishedAt: { value: string };
    // 必要に応じてフィールドを追加
}

export interface Notice {
    id: string;
    title: string;
    content: string;
    category: string;
    publishedAt: string;
}
