export const loadAPIKeyList = (page) => ({
    type: 'LOAD_API_KEYS',
    page

});

export const createAPIKey = (data) => ({
    type: 'CREATE_API_KEY',
    data
});

export const loadAPIKeyDetail = (id) => ({
    type: 'LOAD_API_KEY_DETAIL',
    id
});