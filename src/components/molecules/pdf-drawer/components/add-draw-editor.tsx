import { MvTypography } from '@/components/atoms/mv-typography'
import { Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { useRef, useState } from 'react'
import { Layer, Line, Stage } from 'react-konva'
import { Button } from 'src/components/atoms'

export default function AddDrawEditor(props: {
  addAnnotationItem: (props: { type: 'checklist' | 'text' | 'draw'; text?: string; image?: string }) => void
  disabled?: boolean
}) {
  const [open, setOpen] = useState(false)
  const tool = 'pen'
  const [lines, setLines] = useState<{ tool: string; points: number[] }[]>([])
  const isDrawing = useRef(false)
  const canvasRef = useRef(null)

  const handleMouseDown = (e: any) => {
    isDrawing.current = true
    const pos = e.target.getStage().getPointerPosition()
    setLines([...lines, { tool, points: [pos.x, pos.y] }])
  }

  const handleMouseMove = (e: any) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return
    }
    const stage = e.target.getStage()
    const point = stage.getPointerPosition()
    const lastLine = lines[lines.length - 1]

    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y])

    // replace last
    lines.splice(lines.length - 1, 1, lastLine)
    setLines(lines.concat())
  }

  const handleMouseUp = () => {
    isDrawing.current = false
  }

  function onSave() {
    const data = (canvasRef?.current as any).toDataURL({
      mimeType: 'image/png',
      quality: 1
    }) as string
    props.addAnnotationItem({ type: 'draw', image: data })
    setOpen(false)
    setLines([])
  }

  return (
    <Box>
      <Button
        variant='plain'
        content='iconText'
        icon='tabler:pencil'
        text='Draw'
        color='primary'
        onClick={() => setOpen(true)}
        disabled={props?.disabled}
      />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <MvTypography
            typeSize={'PX'}
            size={'BODY_MD_BOLDEST'}
            sx={{
              fontWeight: 600
            }}
          >
            Add Draw Section
          </MvTypography>
          <Button
            variant='plain'
            content='textOnly'
            text='Reset'
            color='primary'
            onClick={() => setLines([])}
            sx={{
              padding: 0
            }}
          />
        </DialogTitle>
        <DialogContent>
          <Box style={{ border: 'black solid 1px' }}>
            <Stage
              width={400}
              height={200}
              onMouseDown={handleMouseDown}
              onMousemove={handleMouseMove}
              onMouseup={handleMouseUp}
              ref={canvasRef}
            >
              <Layer>
                {lines.map((line, i) => (
                  <Line
                    key={i}
                    points={line.points}
                    stroke='#000000'
                    strokeWidth={2}
                    tension={0.5}
                    lineCap='round'
                    lineJoin='round'
                    globalCompositeOperation={line.tool === 'eraser' ? 'destination-out' : 'source-over'}
                  />
                ))}
              </Layer>
            </Stage>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant='solid' content='textOnly' text='Cancel' color='secondary' onClick={() => setOpen(false)} />
          <Button variant='solid' content='textOnly' text='Save' color='success' onClick={onSave} />
        </DialogActions>
      </Dialog>
    </Box>
  )
}
