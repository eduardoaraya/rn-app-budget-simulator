import {UserType} from '../../shared/UserType';

export type FieldProfile = {
  field?: keyof UserType;
  title?: string;
  fields?: FieldProfile[];
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
