import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-react-documenteditor'

import '@syncfusion/ej2-base/styles/material.css'
import '@syncfusion/ej2-buttons/styles/material.css'
import '@syncfusion/ej2-inputs/styles/material.css'
import '@syncfusion/ej2-popups/styles/material.css'
import '@syncfusion/ej2-lists/styles/material.css'
import '@syncfusion/ej2-navigations/styles/material.css'
import '@syncfusion/ej2-splitbuttons/styles/material.css'
import '@syncfusion/ej2-dropdowns/styles/material.css'
import '@syncfusion/ej2-react-documenteditor/styles/material.css'

DocumentEditorContainerComponent.Inject(Toolbar)

// TODO: Harusnya ambil props DocumentEditorContainerComponent jugak
type DocumentEditorProps = {
  height?: string
}

export const DocumentEditor = (props: DocumentEditorProps) => {
  const { height = '590px' } = props

  return (
    <DocumentEditorContainerComponent
      id='container'
      style={{ height }}
      serviceUrl='https://ej2services.syncfusion.com/production/web-services/api/documenteditor/'
      enableToolbar={true}
    />
  )
}
