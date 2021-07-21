const makeAction = (type, payload, callBack) => {
    return {
        type,
        payload,
        callBack
    }
};

export {makeAction}
