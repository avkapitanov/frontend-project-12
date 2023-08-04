import { useRouteError } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import notfoundImage from '../assets/notfound.svg';

const ErrorPage = () => {
  const { t } = useTranslation();

  const error = useRouteError();
  console.error(error);

  return (
    <div className="text-center">
      <img
        alt={t('notFound.title')}
        className="img-fluid h-25"
        src={notfoundImage}
      />
      <h1 className="h4 text-muted">{t('notFound.title')}</h1>
      <p className="text-muted">
        {t('notFound.text')}
        {' '}
        <a href="/">{t('notFound.linkText')}</a>
      </p>
    </div>
  );
};

export default ErrorPage;
