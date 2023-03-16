/* eslint-disable no-unused-vars */
export interface TableProps {
  columns: any[]
  data: any[]
  totalReconds: number
  currentPage: number
  loading: boolean
  onChangePage: (page: number) => void
}
