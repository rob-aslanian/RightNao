
export const USER_PROFILE_TEXT = {
    education:{
        errors:{
            date:"Your end date can`t be earlier than your start date"
        }
    },
    experience:{
        errors:{
            date:"Your end date can`t be earlier than your start date" 
        }      
    },
    /// Accomplishments ///
    accomplishments:{
        certification:{
            title:'Certification',
            translateKey: '63',
            translateKeyEdit:'300'
        },
        license:{
            title:'License',
            translateKey: '78',
            translateKeyEdit:'861'
        },
        award:{
            title:'Honors & Awards',
            translateKey: '717',
            translateKeyEdit:'717'
        },
        project:{
            title:'Project',
            translateKey: '85',
            translateKeyEdit:'1118'
        },
        publication:{
            title:'Publication',
            translateKey: '86',
            translateKeyEdit:'1137'
        },
        test:{
            title:'Test scores',
            translateKey: '92',
            translateKeyEdit:'1392'
        }

    },
    "validators":{
        "onlySpaces":"you cant enter only space",
        "date":"Your end date can`t be earlier than your start date",
        "username":"Username is already in use",
        "email":"Inccorect email format",
        "email_exist":"Email is already in use",
        "password":"Incorrect password. Please try again",
        "city":"City you entered is incorrect",
        "text":"Use only latin letters",
        "phone":"Invalid phone number",
        "phone_exist":"Phone is already in use",
        "symbolsAndLatin":"Use only latin letter and any symbols",
        "numberAndSymbol":"Use only numbers , dash or spaces",
        "url":"Url is incorrectly formatted",
        "required":"The field is required",
        "url_exist":"A page with URL is already exist",
        "file_name":"A file with the same name already exist",
        "file_format":"The file that you are trying to send is different format",
        "file_10MB":"Attachment size exceeds the allowable limi (10 MB)",
        "discard_changes":"Are you sure you want to discard changes to this ?",
        "email_valid":"Please enter a valid email address",
        "dashSpaceAndLatin":"Use only latin letters , dash, space and numbers",
        'already_exist':'This already exist !',
        "maximum_size":'Attachment size exceeds the allowable limit is'
    }
}




