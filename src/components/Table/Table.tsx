import React from 'react'
import { Box } from '@mui/material'
import { Pagination, Table } from 'antd'

import { TableProps } from 'types/componetsTypes'
import Loading from 'components/Loading'

const TableAdmin = ({ columns, data, totalReconds, currentPage, loading, onChangePage }: TableProps) => {
  return (
    <Box>
      <Box
        sx={{
          p: 3,
          backgroundColor: 'background.default',
          borderRadius: 2,
          minHeight: '658px',
        }}
      >
        {loading ? (
          <Loading />
        ) : (
          <Table
            columns={columns}
            dataSource={data}
            pagination={{
              hideOnSinglePage: true,
            }}
          />
        )}
      </Box>
      {!loading && (
        <Pagination
          defaultCurrent={currentPage}
          total={totalReconds}
          style={{
            margin: '20px 0',
            textAlign: 'right',
          }}
          onChange={onChangePage}
        />
      )}
    </Box>
  )
}

export default TableAdmin
