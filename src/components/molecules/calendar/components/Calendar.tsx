// #region ===== Import =====
import React, { FC, useEffect, useRef, useState } from 'react'

// ** Calendar
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

// ** MUI Components
import { Box, FormControl, IconButton, Stack, Grid, useTheme } from '@mui/material'

// ** Validation Libs
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Atoms / Components
import { Button, Select } from '@/components/atoms'
import { Label } from '@/components/atoms/label'
import { Input } from '@/components/atoms/input'
import { MvTypography } from '@/components/atoms/mv-typography'

// ** Services
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '@/pages/_app'

// ** Other
import { Modal } from '../../modal'
import { PropsCalendar, Event } from '../types/Calendar.type'
import { actionPostEvent } from '../services/actionPostEvent.service'
import { SELECT_TYPE } from '../constants/Calendar'
import { calendarSchema } from '../validations'

import { Icon } from '@iconify/react/dist/iconify.js'

import CalendarWrapper from '../styles/calendar.styles'

// #endregion

const Calendar: FC<PropsCalendar> = ({ dataFetchService, children, isAddEvent, onClick, dateKey, colorKey, titleKey }) => {
  const today = new Date()
  const theme = useTheme()

  // #region ===== State management =====
  const [title, setTitle] = useState('')
  const [dataSelect, setDataSelect] = useState(SELECT_TYPE)
  const [selectedValue, setSelectedValue] = useState('Month')
  const [open, setOpen] = useState(false)

  // #endregion

  const calendarRef = useRef<any>(null)

  const isTypeMonthOrWeek = selectedValue === 'Month' || selectedValue === 'Week'

  const {
    control,
    formState: { errors },
    watch
  } = useForm({
    resolver: yupResolver(calendarSchema)
  })

  const { data: dataService } = dataFetchService()

  const events =
    dataService?.data?.map(event => {
      if (event[dateKey ?? '']) {
        return { ...event, date: event[dateKey ?? 'date'], color: event[colorKey ?? 'color'], title: event[titleKey ?? 'title'] }
      } else {
        return event
      }
    }) ?? []

  // #region ===== Filter Header Calendar  =====
  const handleViewChange = (view: any) => {
    setSelectedValue(view.text)
    setDataSelect(dataSelect)
    const calendarApi = calendarRef.current.getApi()
    calendarApi.changeView(view.id)
    updateTitle()
  }

  const handlePrev = () => {
    const calendarApi = calendarRef.current.getApi()
    calendarApi.prev()
    updateTitle()
  }

  const handleNext = () => {
    const calendarApi = calendarRef.current.getApi()
    calendarApi.next()
    updateTitle()
  }

  const updateTitle = () => {
    const calendarApi = calendarRef.current.getApi()
    const currentTitle = calendarApi.view.title
    setTitle(currentTitle)
  }

  useEffect(() => {
    if (calendarRef.current) {
      updateTitle()
    }
  }, [])
  // #endregion

  // #region ===== Function Event Calendar =====
  const getEventsOnDate = (date: Date) => {
    return events?.filter(event => {
      const eventDate = new Date(event.date)
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      )
    })
  }

  const dayCellClassNames = () => {
    return ['centered-date']
  }

  // #endregion

  // #region ===== Add Event Calendar  =====
  const addEvent = useMutation({
    mutationFn: (newEvent: Event) => actionPostEvent(newEvent),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['CALENDAR'] })
  })

  const onSubmit = async () => {
    const payload: Event = {
      status: 'published',
      title: watch('title'),
      date: watch('date') as string,
      color: watch('color') as string
    }

    addEvent.mutate(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['CALENDAR'] })
        setOpen(false)
      }
    })
  }
  // #endregion

  // #region ===== Render Event  =====
  const renderEventContent = (eventInfo: any) => {
    const eventsOnThisDay = getEventsOnDate(eventInfo.event.start)
    const findEvent = eventsOnThisDay?.find(event => event.title === eventInfo.event.title)

    return (
      <Box width='100%'>
        <Box sx={{ backgroundColor: findEvent?.color ?? 'red', width: '100%', padding: 1, borderRadius: 1 }}>
          <MvTypography typeSize='PX' size='LABEL_SM_NORMAL' color={theme.colorToken.text.neutral.inverted}>
            {eventInfo.event?.title}
          </MvTypography>
        </Box>
      </Box>
    )
  }

  const renderDayCellContent = (dayCellContent: any) => {
    const isToday = today.toDateString() === new Date(dayCellContent.date).toDateString()

    return (
      <Box
        sx={{
          position: 'relative',
          height: 26,
          width: 26,
          borderRadius: '100%',
          backgroundColor: isToday ? theme.colorToken.background.primary.normal : theme.colorToken.background.default,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <MvTypography
          typeSize='PX'
          size='LABEL_MD_NORMAL'
          color={isToday ? theme.colorToken.text.neutral.inverted : theme.colorToken.text.neutral.normal}
        >
          {dayCellContent.dayNumberText}
        </MvTypography>
      </Box>
    )
  }

  const renderDayHeaderContent = (dayHeaderContent: any) => {
    const isToday = today.toDateString() === new Date(dayHeaderContent.date).toDateString()

    const [day, month] = dayHeaderContent?.text?.split(' ')

    return (
      <Box display='flex' alignItems='center' gap={2}>
        <MvTypography typeSize='PX' size='LABEL_MD_NORMAL' color={theme.colorToken.text.neutral.normal}>
          {month}
        </MvTypography>

        <Box
          sx={{
            height: 26,
            width: 26,
            borderRadius: '100%',
            border: isToday ? '2px solid' : 'none',
            borderColor: isToday ? theme.colorToken.border.primary.normal : '',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <MvTypography
            typeSize='PX'
            size={isToday ? 'LABEL_MD_BOLDEST' : 'LABEL_MD_NORMAL'}
            color={isToday ? theme.colorToken.text.primary.bold : ''}
          >
            {day}
          </MvTypography>
        </Box>
      </Box>
    )
  }
  // #endregion

  return (
    <Box display='flex' width='100%'>
      <Box width={isAddEvent ? '20%' : ''}>
        {isAddEvent && (
          <Box>
            <Button variant='solid' content='textOnly' text='Create' fullWidth onClick={() => setOpen(true)} />
            <Modal
              isOpen={open}
              onClose={() => setOpen(false)}
              color='primary'
              title='Add Event'
              position='center'
              closeable
              renderAction={true}
              onOk={() => onSubmit()}
            >
              <form>
                <Box sx={{ display: 'grid', gap: 6 }}>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sx={{ display: 'grid', gap: 1 }}>
                      <Controller
                        name='title'
                        control={control}
                        render={({ field: { name, ...rest }, fieldState }) => {
                          return (
                            <FormControl error={fieldState.invalid}>
                              <Label isRequired={true} size='medium' weight='normal'>
                                Title Event
                              </Label>
                              <Input
                                size='small'
                                error={fieldState.invalid}
                                fullWidth
                                helperText={errors && errors[name]?.message}
                                {...rest}
                              />
                            </FormControl>
                          )
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'grid', gap: 1 }}>
                      <Controller
                        name='color'
                        control={control}
                        render={({ field: { name, ...rest }, fieldState }) => {
                          return (
                            <FormControl error={fieldState.invalid}>
                              <Label isRequired={true} size='medium' weight='normal'>
                                Background Color Event
                              </Label>
                              <Input
                                size='small'
                                error={fieldState.invalid}
                                fullWidth
                                helperText={errors && errors[name]?.message}
                                {...rest}
                              />
                            </FormControl>
                          )
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sx={{ display: 'grid', gap: 1 }}>
                      <Controller
                        name='date'
                        control={control}
                        render={({ field: { name, ...rest }, fieldState }) => {
                          return (
                            <FormControl error={fieldState.invalid}>
                              <Label size='medium' weight='normal'>
                                Time
                              </Label>
                              <input type='datetime-local' {...rest} />
                            </FormControl>
                          )
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </form>
            </Modal>
          </Box>
        )}
        {children}
      </Box>
      <Box width={isAddEvent ? '80%' : '100%'}>
        <Stack
          sx={{
            border: `1px solid ${theme.colorToken.border.neutral.normal}`,
            borderBottomWidth: 0,
            borderTopRightRadius: 6,
            borderTopLeftRadius: 6
          }}
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          padding={2}
        >
          <Stack direction='row' alignItems='center' gap={4}>
            <IconButton onClick={handlePrev}>
              <Icon icon='uiw:left' color={theme.colorToken.icon.neutral.boldest} fontSize={18} />
            </IconButton>
            <MvTypography typeSize='PX' size='LABEL_MD_BOLDEST' color={theme.colorToken.text.neutral.normal}>
              {title}
            </MvTypography>
            <IconButton onClick={handleNext}>
              <Icon icon='uiw:right' color={theme.colorToken.icon.neutral.boldest} fontSize={18} />
            </IconButton>
          </Stack>
          <Select
            data={dataSelect}
            labelKey='text'
            selected={dataSelect}
            valueKey='id'
            variant='default'
            placeholder=''
            onChange={handleViewChange}
            sx={{ minWidth: 160 }}
          />
        </Stack>
        <CalendarWrapper>
          <FullCalendar
            allDayContent={true}
            firstDay={1}
            dayHeaderFormat={
              selectedValue === 'Month'
                ? {
                  weekday: 'short',
                  omitCommas: true
                }
                : {
                  day: 'numeric',
                  weekday: 'short',
                  omitCommas: true
                }
            }
            slotLabelFormat={{
              hour: '2-digit',
              minute: '2-digit',
              omitZeroMinute: false,
              meridiem: false,
              hour12: false
            }}
            dayMaxEventRows={4}
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin]}
            initialView='dayGridMonth'
            weekends={true}
            events={events}
            headerToolbar={false}
            eventContent={renderEventContent}
            dayCellContent={renderDayCellContent}
            dayCellClassNames={dayCellClassNames}
            dayHeaderContent={renderDayHeaderContent}
            allDaySlot={false}
            nowIndicator={false}
            dayHeaders={isTypeMonthOrWeek ? true : false}
            eventClick={async arg => {
              if (onClick) {
                onClick(arg)
              }
            }}
          />
        </CalendarWrapper>
      </Box>
    </Box>
  )
}

export default Calendar
