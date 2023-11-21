import { NavigationMixin } from 'lightning/navigation';

const navigationErrorPage = (maincomInstance,errorMessage) => {
    maincomInstance[NavigationMixin.Navigate]({
        type: 'standard__component',
        attributes: {
            componentName : 'c__commonErrorPageAura',
        },
        state : {
            c__errorMessage : errorMessage
        }
    });
}

const navigationWhenErrorOccur = (maincomInstance, error) => {
    let errorBody;
    if (Array.isArray(error.body)) {
        errorBody = error.body[0];
    } else {
        errorBody = error.body;
    }
    navigationErrorPage(maincomInstance, errorBody.message);
}

export {navigationErrorPage,navigationWhenErrorOccur};