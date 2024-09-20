import { Fragment, useEffect, useState } from 'react'
import { PropsComponent } from './ComponentAsync.type'
import { useDebounce } from 'src/hooks/useDebounce'
import { useAtom } from 'jotai'
import { filterValuesAtom } from './atoms'
import { dateFilterObj, dropdownMultipleFilterObj, searchFilterObj } from './ComponentAsync.utils'
import { Box, Card, CardMedia, Divider, Grid, Input, Skeleton, Typography, useTheme } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { Chip } from 'src/components/atoms/chip'
import { DropdownMultiple } from '../table-async/DropdownMultiple'
import { Date } from '../table-async/Date'
import { Tooltip } from 'src/components/atoms/tooltip'
import { useRouter } from 'next/router'
import ModalFilter from './ModalFilter'
import { Button } from './Button'
import { Pagination } from './Pagination'
import { env } from 'next-runtime-env'

export const ComponentAsync = ({
  dataFetchService,
  limit = 10,
  filters = [],
  sortingServerside,
  ...props
}: PropsComponent) => {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const { palette } = useTheme()

  const debouncedSearch = useDebounce(search, 1000)
  const [filterValues, setFilterValues] = useAtom(filterValuesAtom)
  const {
    data: dataRaw,
    error,
    isLoading,
    isSuccess
  } = dataFetchService({
    page,
    limit,
    meta: ['filter_count'],
    filter:
      filterValues.length || debouncedSearch
        ? {
            _and: filterValues.length
              ? filterValues.map(filterValue => {
                  if (filterValue.type === 'dropdown-multiple') {
                    return dropdownMultipleFilterObj({
                      field: filterValue.field,
                      value: filterValue.values.map(value => value.value)
                    })
                  }

                  return dateFilterObj({
                    field: filterValue.field,
                    date: filterValue.values[0].value
                  })
                })
              : undefined,
            _or: debouncedSearch
              ? searchFilterObj({
                  fields: props.columns.filter(column => column.searchable).map(column => column.field),
                  value: debouncedSearch
                })
              : undefined
          }
        : undefined,
    search: debouncedSearch,
    ...(sortingServerside && firstSortModel
      ? {
          sort: `${firstSortModel.sort === 'desc' ? '-' : ''}${firstSortModel.field}`
        }
      : {})
  })

  const [hoveredItem, setHoveredItem] = useState(null)
  const handleHover = async id => {
    const hovered = dataRaw?.data?.find(item => item.id === id)
    setHoveredItem(hovered)
  }

  const seen = {}
  const seen2 = {}

  const content = () => {
    if (isLoading) {
      return (
        <Grid
          container
          gap={'1rem'}
          sx={{
            p: '1.5rem',
            mt: '.5rem',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 5 }}
        >
          {/* <Skeleton variant='rounded' width='100%' height={60} /> */}
          {Array(limit)
            .fill(null)
            .map((_, i) => (
              <Card key={i} sx={{ width: '18%', height: '30vh', border: 1, borderColor: '#cccccc', cursor: 'pointer' }}>
                <Skeleton
                  key={`table-skeleton-${i}`}
                  animation='wave'
                  variant='rectangular'
                  width='100%'
                  height='100%'
                />
              </Card>
            ))}
        </Grid>
      )
    }

    if (error) {
      return (
        <Typography variant='labelMd' fontWeight={700} noWrap>
          Something went wrong. Please try again later.
        </Typography>
      )
    }

    if (isSuccess) {
      return (
        <Grid
          container
          gap={'1rem'}
          sx={{
            p: '1.5rem',
            mt: '.5rem',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 5 }}
        >
          {dataRaw?.data?.map(item => (
            <Card
              key={item.id}
              sx={{ width: '18%', height: '30vh', border: 1, borderColor: '#cccccc', cursor: 'pointer' }}
              onClick={() => {
                router.push(
                  {
                    pathname: `${props?.url}${item?.id}`,
                    query: {
                      productFamilyId: `${item?.id}`,
                      child_level: `${item?.child_data?.map(a => a?.level)}`,
                      parent_level: `${item?.parent_data?.map(a => a?.level)}`,
                      componentEntitiesId: `${item?.child_data?.map(a => a?.id)}`
                    }
                  }

                  // `${props.url}${item.id}`
                )
              }}
              onMouseEnter={() => handleHover(item?.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <CardMedia
                sx={{ height: 100 }}
                image={`${env('NEXT_PUBLIC_REST_API_URL')}/assets/${
                  item?.image
                }?preview=true&access_token=${localStorage.getItem('accessToken')}`}
                title=''
              />
              <Box
                sx={{
                  p: '1rem'
                }}
              >
                <Box display={'flex'} gap={'.3rem'}>
                  {item.is_active === true ? (
                    <Chip size='small' color='success' label='Active' shape='circular' variant='transparent' />
                  ) : (
                    <Chip size='small' color='error' label='InActive' shape='circular' variant='transparent' />
                  )}

                  {item?.component_defects.some(defect => defect.has_new_component == true) && (
                    <Tooltip
                      id='example'
                      renderContent={
                        <Typography maxWidth={200} textAlign={'center'}>
                          <b>"New Component"</b> there are several new component on {item.code}.
                        </Typography>
                      }
                      variant='top'
                      style='arrow'
                    >
                      <Box
                        sx={{
                          background: palette.primary[100],
                          color: palette.primary.dark,
                          paddingX: '.2rem',
                          paddingTop: '.2rem',
                          borderRadius: '5px',
                          alignContent: 'center'
                        }}
                      >
                        <Icon fontSize='16px' icon='material-symbols:build-outline' />
                      </Box>
                    </Tooltip>
                  )}

                  {item?.component_defects.some(defect => defect.has_new_defect == true) && (
                    <Tooltip
                      id='example'
                      renderContent={
                        <Typography maxWidth={200} textAlign={'center'}>
                          <b>"New Defect"</b> there are several new defect on {item.code}.
                        </Typography>
                      }
                      variant='top'
                      style='arrow'
                    >
                      {item?.component_defects
                        ?.filter(item => {
                          if (!seen[item?.product_family_id?.id]) {
                            seen[item?.product_family_id?.id] = true

                            return true
                          }

                          return false
                        })
                        .map(
                          b =>
                            b?.product_family_id?.id === item?.id && (
                              <>
                                <Box
                                  sx={{
                                    background: palette.error[100],
                                    color: palette.error.dark,
                                    paddingX: '.2rem',
                                    paddingTop: '.2rem',
                                    borderRadius: '5px',
                                    alignContent: 'center'
                                  }}
                                >
                                  <Icon fontSize='16px' icon='material-symbols:report-outline' />
                                </Box>
                              </>
                            )
                        )}
                    </Tooltip>
                  )}
                </Box>
                <Typography variant='h6' component='div'>
                  {item.name}
                </Typography>
                <Typography variant='PlaceholderSm' color='text.secondary'>
                  {item.description}
                </Typography>
              </Box>
            </Card>
          ))}
        </Grid>
      )
    }

    return (
      <Typography variant='labelMd' fontWeight={700} noWrap>
        empty data
      </Typography>
    )
  }

  useEffect(() => {
    setPage(1)
  }, [filterValues.length, debouncedSearch])

  return (
    <Box
      sx={{
        backgroundColor: '#FEFEFE',
        borderRadius: '6px',
        marginTop: '24.5px',
        padding: props.title ? '24px 24px 28px' : undefined
      }}
    >
      {props.title || props.rightHeaderContent ? (
        <Box display='flex' alignItems='center' justifyContent='space-between' height='35px'>
          {props.title ? (
            <Typography variant='subtitle1Medium' color='text.secondary'>
              {props.title}
            </Typography>
          ) : null}

          {props.rightHeaderContent}
        </Box>
      ) : null}

      <Box sx={{ padding: '10px 20px', marginTop: props.title || props.rightHeaderContent ? '20px' : undefined }}>
        <Input
          placeholder='Search'
          variant='filled'
          fullWidth
          sx={{
            '& fieldset': { border: 'none' },
            '& .MuiOutlinedInput-root.Mui-focused': {
              boxShadow: 'none'
            }
          }}
          InputProps={{
            style: {
              paddingLeft: '0px'
            },
            startAdornment: <Icon fontSize='24px' icon='mdi:magnify' color='#6C7086' style={{ marginRight: '10px' }} />
          }}
          onChange={e => setSearch(e.target.value)}
        />
      </Box>

      {filters.length ? (
        <>
          <Divider sx={{ borderColor: theme => theme.palette.grey[200] }} />
          <Box sx={{ padding: '10px 20px', display: 'flex', alignItems: 'center', columnGap: '20px' }}>
            {filters.map(filter => (
              <Fragment key={filter.name}>
                {filter.type === 'dropdown-multiple' ? (
                  <DropdownMultiple
                    name={filter.name}
                    field={filter.field}
                    labelKey={filter.labelKey}
                    dataFetchService={filter.dataFetchService}
                  />
                ) : null}
                {filter.type === 'dropdown-multiple-custom' ? (
                  <ModalFilter label={filter.label} group={filter.group} />
                ) : null}
                {filter.type === 'date' ? <Date name={filter.name} field={filter.field} /> : null}
              </Fragment>
            ))}
          </Box>
        </>
      ) : null}

      <Divider sx={{ borderColor: theme => theme.palette.grey[200] }} />

      <Box sx={{ display: 'flex', columnGap: '10px', height: '63px', alignItems: 'center', padding: '0px 20px' }}>
        {filterValues.length ? (
          filterValues.map((filterValue, index) => (
            <Fragment key={filterValue.name}>
              {filterValue.values.map(value => (
                <Box
                  key={`${filterValue.name}-${value.value}`}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    border: theme => `1px solid ${theme.palette.grey[200]}`,
                    padding: '5px 10px',
                    borderRadius: '9999px',
                    columnGap: '10px'
                  }}
                >
                  <Box sx={{ display: 'flex', columnGap: '6px' }}>
                    <Typography variant='PlaceholderSm' color='text.secondary'>
                      {filterValue.name} :
                    </Typography>
                    <Typography variant='PlaceholderSm' color='text.primary'>
                      {value.text}
                    </Typography>
                  </Box>
                  <Button
                    type='button'
                    style={{ minWidth: 'unset', padding: 0 }}
                    onClick={() => {
                      const filterValuesCopy = [...filterValues]
                      const newValues = filterValue.values.filter(v => v.value !== value.value)
                      if (!newValues.length) {
                        filterValuesCopy.splice(index, 1)
                        setFilterValues(filterValuesCopy)

                        return
                      }
                      setFilterValues(
                        filterValues.map(fv => {
                          return {
                            ...fv,
                            values: newValues
                          }
                        })
                      )
                    }}
                  >
                    <Icon icon='material-symbols:cancel-outline' color='#909094' fontSize='18px' />
                  </Button>
                </Box>
              ))}
              {filterValues.length > 1 && index !== filterValues.length - 1 ? <Typography>AND</Typography> : null}
            </Fragment>
          ))
        ) : (
          <Typography variant='PlaceholderSm' color='text.primary'>
            {/* No Filter */}
          </Typography>
        )}
      </Box>

      {content()}

      <Box
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        {...(props.title ? { marginTop: '20px' } : { padding: '20px' })}
      >
        <Typography fontSize='14px' letterSpacing='0.25px' color='text.secondary'>
          Showing {dataRaw?.data?.length ? (page - 1) * limit + 1 : 0} to{' '}
          {(page - 1) * limit + (dataRaw?.data?.length ?? 0)} of {dataRaw?.meta?.filter_count ?? 0} entries
        </Typography>
        <Pagination
          count={Math.ceil((dataRaw?.meta?.filter_count ?? 0) / limit)}
          page={page}
          onChange={(_, value) => setPage(value)}
          shape='rounded'
        />
      </Box>
    </Box>
  )
}
