import { Component } from 'react';
import { withTranslation } from 'react-i18next';
import './important-notes.scss';

class ImportantNotes extends Component {
    render() {
        const { t }: any = this.props;
        return (
            <div className='important-notes'>
                <div className="title">{t('importantNotes.title')}</div>
                <ol>
                    <li>{t(`importantNotes.1`)}</li>
                    <li>{t(`importantNotes.2`)}</li>
                </ol>
            </div>
        )
    }
}

const ImportantNotesTranslated = withTranslation()(ImportantNotes);

export default ImportantNotesTranslated;