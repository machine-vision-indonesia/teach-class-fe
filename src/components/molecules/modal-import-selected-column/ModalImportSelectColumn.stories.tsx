import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Button } from 'src/components/atoms'
import { ModalImportSelectColumn } from './ModalImportSelectColumn'

const ModalComponents = (props: any) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant='contained' onClick={() => setOpen(true)} content='textOnly' text='Open Modal' />
      <ModalImportSelectColumn {...props} isOpen={open} onClose={() => setOpen(false)} />
    </>
  )
}

export default {
  title: 'Components/Molecules/ModalImportSelectedColumn',
  component: ModalImportSelectColumn,
  argTypes: {
    isOpen: {
      defaultValue: false,
      control: {
        type: 'boolean'
      }
    }
  }
} as ComponentMeta<typeof ModalImportSelectColumn>

const Template: ComponentStory<typeof ModalImportSelectColumn> = args => <ModalComponents {...args} />

export const Default = Template.bind({})
Default.args = {
  dataFactory: [
    {
      value: 'Factory 1',
      label: 'Factory 1'
    },
    {
      value: 'Factory 2',
      label: 'Factory 2'
    }
  ],
  dataFile: {
    title: 'File Name',
    data: [
      {
        number: '1',
        name: 'name 1',
        code: 'code 1',
        id: 'id 1',
        qty: 'qty 1'
      },
      {
        number: '2',
        name: 'name 2',
        code: 'code 2',
        id: 'id 2',
        qty: 'qty 2'
      },
      {
        number: '3',
        name: 'name 3',
        code: 'code 3',
        id: 'id 3',
        qty: 'qty 3'
      },
      {
        number: '4',
        name: 'name 4',
        code: 'code 4',
        id: 'id 4',
        qty: 'qty 4'
      },
      {
        number: '5',
        name: 'name 5',
        code: 'code 5',
        id: 'id 5',
        qty: 'qty 5'
      },
      {
        number: '6',
        name: 'name 6',
        code: 'code 6',
        id: 'id 6',
        qty: 'qty 6'
      }
    ]
  },
  dataTable: {
    title: 'Table Name',
    data: ['Number', 'Name', 'Code', 'Type', 'Id', 'Qty', 'Series']
  }
}

Default.parameters = {
  docs: {
    source: {
      code: `
import { Button } from 'src/@core/custom-components/button/Button'
import { ModalImportSelectColumn } from 'src/@core/custom-components/modal/ModalImportSelectColumn'

const ModalComponents = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant='contained' onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <ModalImportSelectColumn
        isOpen={open}
        onClose={() => setOpen(false)}
        dataFactory: [
          {
            value: 'Factory 1',
            label: 'Factory 1'
          },
          {
            value: 'Factory 2',
            label: 'Factory 2'
          }
        ],
        dataFile: {
          title: 'File Name',
          data: [
            {
              number: '1',
              name: 'name 1',
              code: 'code 1',
              id: 'id 1',
              qty: 'qty 1'
            },
            {
              number: '2',
              name: 'name 2',
              code: 'code 2',
              id: 'id 2',
              qty: 'qty 2'
            },
            {
              number: '3',
              name: 'name 3',
              code: 'code 3',
              id: 'id 3',
              qty: 'qty 3'
            },
            {
              number: '4',
              name: 'name 4',
              code: 'code 4',
              id: 'id 4',
              qty: 'qty 4'
            },
            {
              number: '5',
              name: 'name 5',
              code: 'code 5',
              id: 'id 5',
              qty: 'qty 5'
            },
            {
              number: '6',
              name: 'name 6',
              code: 'code 6',
              id: 'id 6',
              qty: 'qty 6'
            }
          ]
        },
        dataTable: {
          title: 'Table Name',
          data: ['Number', 'Name', 'Code', 'Type', 'Id', 'Qty', 'Series']
        }
      />
    </>
  );
};
    `
    }
  }
}

export const TemplateWithDataTable = Template.bind({})
TemplateWithDataTable.args = {
  dataFactory: [
    {
      value: 'PT. ABC',
      label: 'PT. ABC'
    },
    {
      value: 'PT. XYZ',
      label: 'PT. XYZ'
    }
  ],
  dataFile: {
    title: 'Product EM221',
    data: [
      {
        id: 1,
        product: 'Butcher Twine 4r',
        stock: '1690',
        category: '146081890-3',
        expired: '1/24/2023'
      },
      {
        id: 2,
        product: 'Kellogs Raisan Bran Bars',
        stock: '94',
        category: '737539555-1',
        expired: '1/26/2023'
      },
      {
        id: 3,
        product: 'Table Cloth 81x81 White',
        stock: '2631',
        category: '543797499-X',
        expired: '6/30/2023'
      },
      {
        id: 4,
        product: 'Sauce - Soya, Dark',
        stock: '279',
        category: '771500687-4',
        expired: '1/9/2023'
      },
      {
        id: 5,
        product: 'Wine - Champagne Brut Veuve',
        stock: '913',
        category: '665688258-7',
        expired: '5/31/2023'
      },
      {
        id: 6,
        product: 'Cookie Dough - Oatmeal Rasin',
        stock: '33',
        category: '357084910-4',
        expired: '3/30/2023'
      },
      {
        id: 7,
        product: 'Brocolinni - Gaylan, Chinese',
        stock: '502',
        category: '744811708-4',
        expired: '5/23/2023'
      },
      {
        id: 8,
        product: 'Ecolab Digiclean Mild Fm',
        stock: '760',
        category: '225366097-3',
        expired: '12/12/2023'
      },
      {
        id: 9,
        product: 'Ecolab Digiclean Mild Fm',
        stock: '301',
        category: '521790370-8',
        expired: '8/11/2023'
      },
      {
        id: 10,
        product: 'Cream - 10%',
        stock: '911',
        category: '908643474-6',
        expired: '6/22/2023'
      }
    ]
  },
  dataTable: {
    title: 'New Product 2024',
    data: ['Id', 'Product', 'Stock', 'Type', 'Category', 'Expired', 'Qty']
  }
}

TemplateWithDataTable.parameters = {
  docs: {
    source: {
      code: `
import { Button } from 'src/@core/custom-components/button/Button'
import { ModalImportSelectColumn } from 'src/@core/custom-components/modal/ModalImportSelectColumn'

const ModalComponents = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant='contained' onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <ModalImportSelectColumn
        isOpen={open}
        onClose={() => setOpen(false)}
        dataFactory: [
          {
            value: 'PT. ABC',
            label: 'PT. ABC'
          },
          {
            value: 'PT. XYZ',
            label: 'PT. XYZ'
          }
        ],
        dataFile: {
          title: 'Product EM221',
          data: [
            {
              id: 1,
              product: 'Butcher Twine 4r',
              stock: '1690',
              category: '146081890-3',
              expired: '1/24/2023'
            },
            {
              id: 2,
              product: 'Kellogs Raisan Bran Bars',
              stock: '94',
              category: '737539555-1',
              expired: '1/26/2023'
            },
            {
              id: 3,
              product: 'Table Cloth 81x81 White',
              stock: '2631',
              category: '543797499-X',
              expired: '6/30/2023'
            },
            {
              id: 4,
              product: 'Sauce - Soya, Dark',
              stock: '279',
              category: '771500687-4',
              expired: '1/9/2023'
            },
            {
              id: 5,
              product: 'Wine - Champagne Brut Veuve',
              stock: '913',
              category: '665688258-7',
              expired: '5/31/2023'
            },
            {
              id: 6,
              product: 'Cookie Dough - Oatmeal Rasin',
              stock: '33',
              category: '357084910-4',
              expired: '3/30/2023'
            },
            {
              id: 7,
              product: 'Brocolinni - Gaylan, Chinese',
              stock: '502',
              category: '744811708-4',
              expired: '5/23/2023'
            },
            {
              id: 8,
              product: 'Ecolab Digiclean Mild Fm',
              stock: '760',
              category: '225366097-3',
              expired: '12/12/2023'
            },
            {
              id: 9,
              product: 'Ecolab Digiclean Mild Fm',
              stock: '301',
              category: '521790370-8',
              expired: '8/11/2023'
            },
            {
              id: 10,
              product: 'Cream - 10%',
              stock: '911',
              category: '908643474-6',
              expired: '6/22/2023'
            }
          ]
        },
        dataTable: {
          title: 'New Product 2024',
          data: ['Id', 'Product', 'Stock', 'Type', 'Category', 'Expired', 'Qty']
        }
      />
    </>
  );
};
    `
    }
  }
}
