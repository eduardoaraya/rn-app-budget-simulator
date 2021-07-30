import {UserType} from '../../shared/UserType';

export type FieldProfile = {
  field?:
    | keyof UserType
    | keyof {
        password?: string;
        passwordConfirmation?: string;
      };
  title?: string;
  fields?: FieldProfile[];
  secureTextEntry?: boolean;
};

export const ProfileFields: FieldProfile[] = [
  {
    field: 'name',
    title: 'Name',
  },
  {
    field: 'email',
    title: 'Email',
  },
  {
    fields: [
      {
        field: 'telephone',
        title: 'Telefone',
      },
      {
        field: 'cpf',
        title: 'CPF',
      },
    ],
  },
  {
    fields: [
      {
        field: 'cnpj',
        title: 'CNPJ',
      },
      {
        field: 'companyName',
        title: 'Nome da empresa',
      },
    ],
  },
  {
    fields: [
      {
        field: 'addressStreet',
        title: 'Rua',
      },
      {
        field: 'addressZipcode',
        title: 'CEP',
      },
    ],
  },
  {
    fields: [
      {
        field: 'addressCity',
        title: 'Cidade',
      },
      {
        field: 'addressDistrict',
        title: 'Bairro',
      },
    ],
  },
  {
    fields: [
      {
        field: 'addressComplement',
        title: 'Complemento',
      },
      {
        field: 'addressNumber',
        title: 'Número',
      },
      {
        field: 'addressState',
        title: 'Estado',
      },
    ],
  },
];

export const RegisterFields: FieldProfile[] = [
  ...ProfileFields,
  {
    fields: [
      {
        field: 'password',
        title: 'Senha',
        secureTextEntry: true,
      },
      {
        field: 'passwordConfirmation',
        title: 'Confirmação de senha',
        secureTextEntry: true,
      },
    ],
  },
];
