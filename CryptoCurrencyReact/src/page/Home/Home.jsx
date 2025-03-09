import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import AssetTable from './AssetTable';
import StockChart from './StockChart';
import { useDispatch, useSelector } from 'react-redux';
import { getCoinList, getTop50CoinList } from '@/State/Coin/Action';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const Home = () => {
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);
  const { coin } = useSelector(store => store);
  const dispatch = useDispatch();

  useEffect(() => {
    if (category === 'top50') {
      dispatch(getTop50CoinList());
    }
  }, [category, dispatch]);

  useEffect(() => {
    if (category === 'all') {
      dispatch(getCoinList(page));
    }
  }, [category, page, dispatch]);

  const handlePageChange = (newPage) => {
    if (newPage > 0) {
      setPage(newPage);
    }
  };

  return (
    <div className='relative'>
      <div className='lg:flex'>
        <div className='lg:w-[50%] lg:border-r'>
          <div className='p-3 flex items-center gap-4'>
            <Button onClick={() => { setCategory('all'); setPage(1); }} variant={category === 'all' ? 'default' : 'outline'} className='rounded-full'>
              All
            </Button>
            <Button onClick={() => setCategory('top50')} variant={category === 'top50' ? 'default' : 'outline'} className='rounded-full'>
              Top 50
            </Button>
          </div>
          <AssetTable coin={category === 'all' ? coin.coinList : coin.top50} category={category} />
          
          {category === 'all' && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href='#' onClick={() => handlePageChange(page - 1)} />
                </PaginationItem>
                {[...Array(5)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink href='#' onClick={() => handlePageChange(index + 1)}>{index + 1}</PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext href='#' onClick={() => handlePageChange(page + 1)} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
        <div className='hidden lg:block lg:w-[50%] p-5'>
          <StockChart coinId={'bitcoin'} />
        </div>
      </div>
    </div>
  );
};

export default Home;
