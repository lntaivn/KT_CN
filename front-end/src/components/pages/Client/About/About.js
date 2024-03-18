import React from 'react';
import { useTranslation } from 'react-i18next';

const About = () => {
    const { t } = useTranslation();

    return ( 
        <div className='flex w-full	 items-center justify-center'>
            <div className='w-[1140px] p-5'>
                <h1> {t('about.text_about_1')}</h1>
                <h2>{t('about.text_about_2')}</h2>
                <p>
                    {t('about.text_about_body_1')}
                </p>

                <p>{t('about.text_about_body_2')}</p>
                <p>
                    {t('about.text_about_body_3')}
                </p>
                <p>
                    {t('about.text_about_body_4')}
                </p>
            </div>
        </div>
    );
}

export default About;
