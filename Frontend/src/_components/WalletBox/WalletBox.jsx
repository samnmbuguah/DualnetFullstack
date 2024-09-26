import { BotCell } from '_components/BotCell/Botcell'
import Divider from '_components/Divider/Divider'
import React from 'react'

const WalletBox = () => {
    return (
        <div className=''>
            <BotCell
                title={`LTC/USDT <small class="text-xs font-[inter] capitalize">spot</small>`}
                titleStyle="text-[#D7AD7D] dark:text-[#D9CFBF] font-[syncopate-bold] !font-bold text-xl"
                value="29.258"
                valueStyle="font-[syncopate-light] !font-bold"
                ValueColor=" text-[#6C6A66] dark:text-[#D9CFBF]"

            />
            <Divider className="my-2"/>
        </div>
    )
}

export default WalletBox