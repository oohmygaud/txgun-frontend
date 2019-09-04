import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TimeAgo from 'timeago-react'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'

const ValueCell = ({ tx }) => {
  if (!tx.is_token) { return tx.value / 10E18 + ' ETH' }

  if (tx.token_info && tx.token_amount && tx.token_info.symbol) {
    const decimals = tx.token_info.decimal_places ? Math.pow(10, tx.token_info.decimal_places) : 1
    return <span>
      {tx.token_amount / decimals + ' '}
      <a href={`https://etherscan.io/token/${tx.token_info.contract}`} target="_new" style={{ color: 'blue' }}>
        {tx.token_info.symbol}
      </a>
    </span>
  }
  return tx.token_amount + ' UNKNOWN TOKENS'
}

const TransactionTable = (props) => {
  return <Grid item xs={12}>
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Created</TableCell>
            <TableCell>TX Hash</TableCell>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Value</TableCell>
            { props.show_pricing_info
              ? <TableCell>Price</TableCell>
              : null
            }

          </TableRow>
        </TableHead>
        <TableBody>
          {props.transactions.map(transaction => (
            <TableRow key={transaction.id}>
              <TableCell>
                <TimeAgo datetime={transaction.created_at} />
              </TableCell>
              <TableCell>
                <a
                  href={'https://etherscan.io/tx/' + transaction.tx_hash}
                  target="_new"
                  style={{ color: 'blue', textDecoration: 'underlined' }}
                >
                  {transaction.tx_hash.substr(0, 8)}...
                </a>
              </TableCell>
              <TableCell>{transaction.from_address.substr(0, 8)}...</TableCell>
              <TableCell>{
                transaction.is_token
                  ? transaction.token_to.substr(0, 8) + '...'
                  : transaction.to_address.substr(0, 8) + '...'
              }</TableCell>
              <TableCell>
                <ValueCell tx={transaction} />
              </TableCell>
              { props.show_pricing_info
                ? <TableCell>
                  { transaction.pricing_info && transaction.pricing_info.fiat > 0.01
                    ? transaction.pricing_info.fiat.toFixed(2) + ' ' + transaction.pricing_info.currency
                    : null
                  }
                </TableCell>
                : null }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  </Grid>
}

export default TransactionTable
