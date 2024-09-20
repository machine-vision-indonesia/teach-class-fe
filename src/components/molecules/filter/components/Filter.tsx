import { IFilter } from '../types/filter.types'
import { InlineFilter } from './InlineFilter'

/**
 * Filter adalah elemen antarmuka pengguna yang memungkinkan pengguna untuk menyaring dan mengurutkan data atau konten berdasarkan kriteria tertentu. Kegunaannya sangat penting dalam meningkatkan pengalaman pengguna, terutama ketika berhadapan dengan sejumlah besar data atau pilihan. Filter membantu pengguna menemukan informasi yang relevan dengan cepat dan efisien, sehingga menghemat waktu dan usaha. Komponen ini sering digunakan dalam berbagai aplikasi web seperti e-commerce, pencarian pekerjaan, dan database, di mana pengguna dapat memfilter hasil berdasarkan kategori, harga, tanggal, atau atribut lain yang relevan.
 */
export const Filter: React.FC<IFilter> = ({
  type = 'inline',
  resultController = [],
  dataViewController = [],
  onChange = () => {}
}) => {
  switch (type) {
    case 'inline':
      return (
        <InlineFilter resultController={resultController} dataViewController={dataViewController} onChange={onChange} />
      )

    case 'sidebar':
      return null

    case 'card-group':
      return null

    default:
      return (
        <InlineFilter
          type={'inline'}
          resultController={resultController}
          dataViewController={dataViewController}
          onChange={onChange}
        />
      )
  }
}
