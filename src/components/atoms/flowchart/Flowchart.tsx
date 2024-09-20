import {
  DiagramComponent,
  type NodeModel,
  type ConnectorModel,
  Node,
  DataBinding,
  HierarchicalTree,
  Inject,
  type DiagramModel,
  type AnnotationModel,
  type LayoutModel,
  DiagramConstraints
} from '@syncfusion/ej2-react-diagrams'
import { DataManager } from '@syncfusion/ej2-data'

export type DataInfo = {
  [key: string]: string
}

type FlowchartProps<T> = Pick<DiagramModel, 'width' | 'height'> &
  Pick<LayoutModel, 'orientation'> & {
    data: T[]
    dataId: Extract<keyof T, string>
    dataParentId: Extract<keyof T, string>
    dataContent: Extract<keyof T, string>
    textStyle?: AnnotationModel['style']
    nodeStyle?: NodeModel['style']
    connectorStyle?: ConnectorModel['style']
  }

export const Flowchart = <T extends object>(props: FlowchartProps<T>) => {
  return (
    <DiagramComponent
      width={props.width}
      height={props.height}
      dataSourceSettings={{
        id: props.dataId,
        parentId: props.dataParentId,
        dataManager: new DataManager({
          json: props.data
        }),
        doBinding: (nodeModel: NodeModel, data: DataInfo) => {
          nodeModel.annotations = [
            {
              content: data[props.dataContent],
              style: props.textStyle
            }
          ]

          nodeModel.style = props.nodeStyle
        }
      }}
      layout={{
        type: 'HierarchicalTree',
        orientation: props.orientation
      }}
      getNodeDefaults={(obj: Node) => {
        obj.shape = {
          type: 'Basic',
          shape: 'Rectangle'
        }
      }}
      getConnectorDefaults={(connector: ConnectorModel) => {
        connector.type = 'Straight'
        connector.style = props.connectorStyle
        connector.targetDecorator = {
          shape: 'Arrow'
        }
      }}
      snapSettings={{
        constraints: 0
      }}
      constraints={DiagramConstraints.None}
    >
      <Inject services={[DataBinding, HierarchicalTree]} />
    </DiagramComponent>
  )
}
