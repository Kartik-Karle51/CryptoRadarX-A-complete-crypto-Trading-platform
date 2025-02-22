
import { Button } from '@/components/ui/button';
import React, { useEffect } from 'react';
import AssetTable from './AssetTable';
import StockChart from './StockChart';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { DotIcon, MessageCircle } from 'lucide-react';
import { Cross1Icon } from '@radix-ui/react-icons';
import { Input } from '@/components/ui/input';
import { getCoinList, getTop50CoinList } from '@/State/Coin/Action';
import { useDispatch, useSelector } from 'react-redux';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


const Home = () => {
  const [category, setCategory] = React.useState("all")

  const [inputValue, setInputValue] = React.useState("");

  const [isBotRelease, setIsBotRelease] = React.useState(false);

  const { coin } = useSelector(store => store)

  const dispatch = useDispatch()

  const handleBotRelease = () => setIsBotRelease(!isBotRelease);

  const handleCategory = (value) => {
    setCategory(value)
  }

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleKeyPress = (event) => {
    if (event.key == "Enter") {
      console.log(inputValue);
    }
    setInputValue("");
  }
  useEffect(() => {
    dispatch(getTop50CoinList())
  }, [category])
  useEffect(() => {

    dispatch(getCoinList(10));
  }, [])

  return (
    <div className='relative'>
      <div className='lg:flex'>
        <div className='lg:w-[50%] lg:border-r'>
          <div className='p-3 flex items-center gap-4'>
            <Button onClick={() => handleCategory("all")} variant={category == "all" ? "default" : "outline"} className="rounded-full">All</Button>

            <Button onClick={() => handleCategory("top50")} variant={category == "top50" ? "default" : "outline"} className="rounded-full">Top 50</Button>

            <Button onClick={() => handleCategory("topGainers")} variant={category == "topGainers" ? "default" : "outline"} className="rounded-full">Top Gainers</Button>

            <Button onClick={() => handleCategory("topLosers")} variant={category == "topLosers" ? "default" : "outline"} className="rounded-full">Top Losers</Button>
          </div>
          <AssetTable coin={category == "all" ? coin.coinList : coin.top50} category={category} />
          <div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>

        <div className='hidden lg:block lg:w-[50%] p-5'>
          <StockChart coinId={"bitcoin"} />
        </div>

      </div>

    </div>
  )
}

export default Home