// TODO: This file does not need to live here, 
// I just wanted to extract this logic out to make testing easier

// return the error string on error, if valid return null?
// Name needs improvement
export const getInvalidWeblinkKey = (link, isExternalResource) => {
    console.log(`validate: ${link}`);

    if ( link.length === 0 ) {
        return 'content.emptyLinkField';
    }

    //max length?

    //this can absolutely move
    const expression = /^(?:https?:\/\/)?(?:[a-zA-Z0-9][a-zA-Z0-9\-]*\.)+[a-zA-Z0-9][a-zA-Z0-9\-]*(?::\d+)?(?:$|[\/\?#].*$)/;
    const urlRegExp = new RegExp(expression);

    if ( !urlRegExp.test( link ) ) {
        return 'content.invalidLink';
    }

    if ( !isExternalResource && link.substr( 0, 7 ) === 'http://' ) {
        return 'content.notHttps';
    }

    //there is some more url processing here (see WebLinkView.jsx in smart-curriculum)...

    // TODO: How exactly is this determined?
    const isLMSLink = false;
    if ( !isExternalResource && isLMSLink ) {
        return 'content.noEmbed';
    }

    // valid
    return null;
}

