import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabContext from '@mui/lab/TabContext'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import {SyntheticEvent, useState} from "react";
import {PropsTabbing} from "./Tabbing.type";


export const Tabbing = ({data=[]}:PropsTabbing) => {

  // ** State
  const [value, setValue] = useState<string>('0')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }


  return (
    <TabContext value={value}>
      <TabList onChange={handleChange} aria-label='icon tabs example'>
        {data.map((dataTab,index) =>
          <Tab value={index.toString()} disabled={dataTab.disabled} key={dataTab.toString()}
               label={dataTab.iconName != null ? <div><Icon icon={dataTab.iconName} style={{verticalAlign: 'middle'}}/>{dataTab.title}
                 {dataTab.countData != null ? `(${dataTab.countData})`:''}</div>:`${dataTab.countData != null ? `${dataTab.title} (${dataTab.countData})`:dataTab.title}`}/>
        )}
      </TabList>
    </TabContext>
  )
}
