import React from 'react';
import { withTranslation } from 'react-i18next';

class LanguageChoice extends React.Component {

     render() {
        return(
            <div>
                <p>{this.props.t('Language')}</p>
                <input type="radio" id="en" value="en" checked={this.props.i18n.language === 'en'} onChange={() => this.onLanguageChange('en')} />
                <label htmlFor={"en"}>{this.props.t('English')}</label>
                <input type="radio" id="de" value="de" checked={this.props.i18n.language === 'de'} onChange={() => this.onLanguageChange('de')} />
                <label htmlFor={"de"}>{this.props.t('German')}</label>
                <input type="radio" id="es" value="es" checked={this.props.i18n.language === 'es'} onChange={() => this.onLanguageChange('es')} />
                <label htmlFor={"es"}>{this.props.t('Spanish')}</label>
             </div>
        )
     }

     onLanguageChange(lng) {
        this.props.i18n.changeLanguage(lng);
     }

}

export default withTranslation()(LanguageChoice);