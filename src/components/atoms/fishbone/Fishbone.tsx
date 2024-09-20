import Fishbone from '@hophiphip/react-fishbone';
import { Box} from '@mui/material';

const FishboneDiagram = ({
  data,
  head = 'Problem',
}: any) => {

  return (
    <>
      <Box width={'100%'}>
        <Fishbone
          items={{
            "name": head,
            "children": data
          }}
          wrapperStyle={{
            height: 750,
            paddingLeft: '4dvh'
          }}
        />
      </Box>
    </>

  );
};

export default FishboneDiagram;
