import * as yup from 'yup';

const channelSchema = (channels, t) => yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(3, t('modals.add.min'))
    .max(20, t('modals.add.max'))
    .notOneOf(channels.map(({ name }) => name), t('modals.add.alreadyExists'))
    .required(t('modals.add.requiredField')),
});

export default channelSchema;
