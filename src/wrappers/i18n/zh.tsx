const zh = {
    captcha: {
        header: '輸入驗證碼（英文正楷）',
        placeholder: '輸入上面的文字：',
        button: '驗證並繼續',
        selectOptions: {
            English: '中文',
            Chinese: 'EN'
        },
        TechnicalError: '暫時未能提供服務，請稍後再試。如有不便，敬請原諒。',
        Maintenance: '暫時未能提供服務，請稍後再試。如有不便，敬請原諒。',
        Thankyou: '多謝閣下對此服務的興趣。 由於網上預訂鈔票反應熱烈，全部網上配額已被預訂。如需協助，請到臨我們的分行。',
        Error: "您所輸入的驗證碼不正確，請重新輸入。"
    },
    tab: {
        new_booking: '預訂',
        update_booking: '查詢/取消'
    },
    importantNotes: {
        title: '重要事項:',
        1: '所有網上預定申請一經提交，不得修改。',
        2: '指定領鈔分行並不會安排快捷櫃檯予客戶領取鈔票。',
        3: '客戶可指示銀行從個人銀行賬戶中扣除全部兌換金額，或在櫃檯兌換相同數值的舊鈔票（港幣），從而領取鈔票。',
        4: '客戶應在指定領鈔分行的櫃檯查看鈔票的狀況。更換鈔票只能在領鈔時發現損壞的情況下進行安排。客戶離開領鈔櫃檯後，本行將不接受更換鈔票的要求。',
        5: '如客戶沒有在指定領鈔分行和指定日期領取鈔票，或未按照規定的條款和細則領取鈔票，本行將不會為客戶保留鈔票。客戶將被視為已經放棄收取鈔票的權利，本行將自行決定處置未領取的鈔票。',
        6: '除另有說明外，凡於條款及細則內提及的日期，僅指本行於該日期的正常營業時間，並不包括當香港發出8號或以上熱帶氣旋警告信號或黑色暴雨警告信號時之任何時間。',
        7: '每個手機號碼在每天只能預訂一套套裝新鈔票。'
    },
    new_booking: {
        header: '網上預訂新鈔票',
        hint: '請填寫以下表格以完成登記',
        button: {
            back: '上一步',
            submit: '提交',
            review: '下一步'
        },
        booking_success: '多謝閣下提交此預訂表格。 確認短信將發送至此表格中提供的手機號碼。',
        booking_duplicatemobile: '手機號碼已登記此服務。每個手機號碼在每天只能預訂一套套裝新鈔票。請登記另一個領鈔日期或使用另一個手機號碼進行預訂。',
        booking_noslotavaialble: '* 此分行的網上配額已被全部預訂，請選擇其他日期或分行。',
        error: '我們未能處理您的指示。請稍後再試。',
        refnumber: '閣下的參考編號是',
        sessionexpire: ' 基於保安理由，這次的使用時段已被結束。 請按[確定]重新開始登記。'
    },
    update_booking: {
        mobile: '手機號碼',
        email: '電郵地址',
        button: '提交',
        cancelbutton: '取消已選擇的預訂',
        cancel_success: '我們已收到閣下的取消指示，多謝閣下使用此服務。確認短信將發送至此表格中提供的手機號碼。',
        norecordfound: '您輸入的手提電話號碼並未登記此服務。請重新輸入。',
        cancel_failure: '我們未能處理您的指示。請稍後再試。',
        subtitle:'查詢/取消',
        sessionexpire: ' 基於保安理由，這次的使用時段已被結束。 請按[確定]重新開始登記。'
    },forms: {
        'subtitle':'預訂資料',
        'SelectPlaceholder': '請選擇...',
        'Title': '稱謂',
        'LastName': '姓氏',
        'MobileNumber': '手機號碼',
        'CollectionBranch': '指定領鈔分行',
        'CollectionDate': '領鈔日期',
        'CollectionTimeslot': '領鈔時段',
        'Quantity': '數量',
        'Declaration': '聲明',
        'QuantityText': '每套總價值：港幣$3,000 (面額: 港幣$20 x 100張, 港幣$50 x 20張)。請預備現金作兌換。',
        "ReferenceNumber": '參考編號',
        'DeclarationPoints': {
            1: '本人確認以上資料均為屬實準確。表格提交後不得修改。',
            2: '我已閱讀、明白及同意本申請的<a target="_blank" href="https://av.sc.com/hk/content/docs/hk-cny-tandc-2022.pdf">條款和條件</a>。'
        },
        'QuantityValue':'1',
        'countrycode':'852',
        "regionThree": "---- 新界 ----",
        "regionTwo": "---- 九龍 ----",
        "regionOne": "----  香港  ---- ",
        'ReviewDetails':'檢閱預訂資料',
        'Note': '注意',
        'Notes': `確認短信將發送至此表格中提供的手機號碼，提交前請檢閱手機號碼。以上輸入之資料（包括您的手機號碼）只會用於此服務的短訊通知，並且不會更新或儲存到客戶在本行的個人資料（如果您是銀行的現有客戶）。上述資料只會儲存至服務結束後一個月（至2022年2月28日）。 `,
        'TitleRequiredValidation': '注意',
        'LastNameRequiredValidation': '請提供所需資料。',
        'MobileNumberRequiredValidation': '請提供所需資料。',
        'MobileNumberLengthValidation': '請輸入有效的電話號碼。',
        'MobileNumberValidation': '您輸入的手提電話號碼無效。請重新輸入有效的手提電話號碼。',
        'CollectionBranchRequiredValidation': '請提供所需資料。',
        'CollectionDateRequiredValidation': '請提供所需資料。',
        'CollectionTimeslotRequiredValidation': '請提供所需資料。',
        'DeclarationRequiredValidation': '請確認您已閱讀、明白及同意本申請的條款和條件 。',
        'noslotsavailable': '此分行的網上配額已被全部預訂，請選擇其他分行。',
        "salutationOne": "先生",
        "salutationTwo": "太太",
        "salutationThree": "小姐",
        "sessionexpire": ' 基於保安理由，這次的使用時段已被結束。 請按[確定]重新開始登記。'
    },
    review_orders: {

    }, modal:{
        'okbutton': '回到主頁'
    },
    response: {

    }
};
export default zh;