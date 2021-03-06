const en = {
    captcha: {
        header: 'Type the verification code (in capital letters)',
        placeholder: 'Type the above characters:',
        button: 'Verify to Proceed',
        selectOptions: {
            English: '中文',
            Chinese: 'Chinese'
        },
        TechnicalError: 'This service is temporarily unavailable for system maintenance. Please try again later. Apologies for the'
        +' inconvenience caused',
        Maintenance: 'This service is temporarily unavailable for system maintenance. Please try again later. Apologies for the'
        +' inconvenience caused',
        Thankyou: 'Thank you for your interest for this service, however our new banknotes reservation are fully booked. Please visit our branches'
        +' for assistance.',
        Error: 'The verification code you entered is incorrect, please retry.'
    },
    tab: {
        new_booking: 'Booking',
        update_booking: 'Enquiry/Cancel'
    },
    importantNotes: {
        title: 'Important Notes:',
        1: ' All Online Pre-orders, once submitted, cannot be amended.',
        2: ' No express queue will be arranged for the collection of banknotes pre-ordered online.',
        3: 'Clients, when collecting the banknote(s), may instruct the Bank to debit the total sum from the his/her personal bank account or by exchanging the same amount of old banknote(s) (in Hong Kong currency) at the collection counters.',
        4: 'Clients must check the conditions of the banknote(s) at the counters of the Designated Collection Branch as shown above. Replacement of the banknote(s) will only be arranged if found damaged at the time of collection. Requests for replacement of the banknote(s) will not be accepted after the clients have left the collection counters.',
        5: 'lf a client does not collect the banknote(s) at the Designated Collection Branch and on the Designated Collection Date, or fails to collect the banknote(s)in accordance with the terms and conditions provided, the Bank will not keep the banknote(s) for the client. The client shall be deemed to have forgone the right to collect the banknote(s) and that the Bank will dispose of the uncollected banknote(s) at its absolute discretion.',
        6: 'Unless otherwise stated, any reference to a date in the terms and conditions only refers to the normal business hours of the Bank on such date, and does not include any time within which a tropical cyclone warning signal number 8 or above, a Black Rainstorm warning signal, is in force in Hong Kong.',
        7: 'Every mobile number can only register for one pack of new banknotes per day.'
    },
    new_booking: {
        header: 'Chinese New Year New Banknotes Booking',
        hint: 'Please fill in the below ordering form to complete the registration',
        button: {
            back: 'Back',
            submit: 'Submit',
            review: 'Next'
        },
        refnumber: 'Your Reference Number is',
        booking_success: 'Thank you for your submission of this pre-order form: A sms confirmation will be sent to your mobile number provided in this form.',
        booking_duplicatemobile: 'Same mobile number is registered.  Every mobile number can only register for 1 slot per day, please enter another mobile number or register with another collection date for the booking.',
        booking_noslotavaialble: '* The quota is out for this branch, please pick another date or branch',
        error: 'We are unable to process your request right now. Please retry later.',
        sessionexpire: 'This session has timed out for security reasons. Please click "OK" to start registration again.'
    },
    update_booking: {
        mobile: 'Mobile Number',
        email: 'Email Address',
        button: 'Submit',
        cancelbutton: 'Cancel selected booking',
        subtitle:'Review Or Cancel Order',
        cancel_success: 'Your selected booking has been cancelled. A sms confirmation will be sent to your mobile number provided in this form.',
        norecordfound: 'The mobile number you entered is not registered for this service, please retry ',
        cancel_failure: 'We are unable to process your request right now. Please retry later.',
        sessionexpire: 'This session has timed out for security reasons. Please click "OK" to start registration again.'
    },
    forms: {
        'subtitle':'Order Details',
        'SelectPlaceholder': 'Please Select...',
        'Title': 'Title',
        'LastName': 'Last Name',
        'MobileNumber': 'Mobile Number',
        'CollectionBranch': 'Designated Collection Branch',
        'CollectionDate': 'Collection Date',
        'CollectionTimeslot': 'Collection Timeslot',
        'Quantity': 'Quantity ',
        "ReferenceNumber": 'Reference Number',
        'Declaration': 'Declaration',
        'QuantityText': 'Total value per pack: HK$3,000. (Denomination: HK$20 x 100pcs, HK$50 x 20pcs) Please prepare cash for exchange.',
        'DeclarationPoints': {
            1: 'I confirm the above information is accurate to my knowledge. No amendment is allowed once the form is submitted',
            2: 'I have read, understood and agreed to the <a target="_blank" href="https://av.sc.com/hk/content/docs/hk-cny-tandc-2022.pdf">terms and conditions</a> of this application'
        },
        "regionThree": "---- New Territories ---- ",
        "regionTwo": "---- Kowloon  ---- ",
        "regionOne": "---- Hong Kong ----",
        'TitleRequiredValidation': 'Please enter the required information.',
        'LastNameRequiredValidation': 'Please enter the required information.',
        'MobileNumberRequiredValidation': 'Please enter the required information.',
        'MobileNumberLengthValidation': 'The mobile number you entered is invalid. Please enter a valid mobile number and retry.',
        'MobileNumberValidation': 'The mobile number you entered is invalid. Please enter a valid mobile number and retry.',
        'CollectionBranchRequiredValidation': 'Please enter the required information.',
        'CollectionDateRequiredValidation': 'Please enter the required information.',
        'CollectionTimeslotRequiredValidation': 'Please enter the required information.',
        'DeclarationRequiredValidation': 'Please confirm you have have read, understood and agreed to the terms and conditions of this application.',
        "salutationOne": "Mr.",
        "salutationTwo": "Mrs.",
        "salutationThree": "Miss",
        'noslotsavailable': 'The online quota for this branch is out, please select another branch.',
        'countrycode':'852',
        'QuantityValue':'1',
        'ReviewDetails': 'Review of Order Details',
        'Note': 'Note',
        'Notes': `A sms confirmation will be sent to your mobile number provided in this form, please review your mobile number before proceed. The above information (including your mobile number) will only be used for sending out notification of this service only and will not be updated to your Bank’s record (if you are an existing customer of the Bank).The above information will only be stored until 1 month after the notes exchange period (by 28 Feb 2022).`,
        sessionexpire: 'This session has timed out for security reasons. Please click "OK" to start registration again.'
    },
    modal:{
        'okbutton': 'Ok'
    },
    review_orders: {

    },
    response: {

    }
};
export default en;