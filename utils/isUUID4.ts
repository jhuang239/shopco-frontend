export const isUUID4 = (str: string): boolean => {
    // UUID v4 pattern: 8-4-4-4-12 hex digits with the version digit being 4
    const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidV4Regex.test(str);
};