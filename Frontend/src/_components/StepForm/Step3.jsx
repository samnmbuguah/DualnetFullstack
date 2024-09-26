import { useEffect, useState } from "react";

function Step3({ onPreviousStep }) {
  const [timestamp, setTimestamp] = useState(null);
  const [status, setStatus] = useState(null);
  const [block, setBlock] = useState(null);
  const [fromAddress, setFromAddress] = useState(null);
  const [toAddress, setToAddress] = useState(null);

  const transactionHash = "0x26b7e73e275e9c6d0ed22eaef9cb8c6e8e3aebb4de91b1357a37b3c2437a49e3";
          
  useEffect(() => {
    const fetchTransactionTimestamp = async () => {
      try {
        const apiKey = 'EZUQ8AAXTE4952Z87VJ9NJXCVKUBA7MCZV';
        // get transaction data
        const transactionUrl = `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${transactionHash}&apikey=${apiKey}`;
        const transactionResponse = await fetch(transactionUrl);
        const transactionData = await transactionResponse.json();

        // get transaction status
        const transactionStatus = `https://api.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=${transactionHash}&apikey=${apiKey}`;
        const statusResponse = await fetch(transactionStatus);
        const statusData = await statusResponse.json();

        // Check the status field within the transactionData
        if (statusData.result.status === '0') {
          setStatus('Failed');
        } else if (statusData.result.status === '1') {
          setStatus('Success');
        } else {
          setStatus('Pending');
        }
        

        if (transactionData.result) {
          //get fromaddress
          setFromAddress(transactionData.result.from)
          //get to address
          setToAddress(transactionData.result.to)
          // Get gas price and calculate transaction fee and gas fee


          // get block number
          const blockNumber = transactionData.result.blockNumber;
          setBlock(parseInt(blockNumber, 16))
          const blockUrl = `https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=${blockNumber}&boolean=true&apikey=${apiKey}`;

          const blockResponse = await fetch(blockUrl);
          const blockData = await blockResponse.json();
          if (blockData.result) {
            setTimestamp(blockData.result.timestamp);
          } else {
            console.error('Error retrieving block details');
          }
        } else {
          console.error('Error retrieving transaction details');
        }
      } catch (error) {
        console.error('Error fetching transaction details', error);
      }
    };

    fetchTransactionTimestamp();
  }, [transactionHash]);

  //data time format function
  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);

    const timeDiff = now.getTime() - date.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60)) % 24;
    
    let formattedTimestamp = '';
    
    if (daysDiff > 0) {
      formattedTimestamp += `${daysDiff} days `;
      formattedTimestamp += `${hoursDiff} hrs ago (${date.toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'UTC'
      })} +UTC)`;
    } else {
      formattedTimestamp += `${hoursDiff} hrs ago (${date.toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'UTC'
      })} +UTC)`;
    }

    return formattedTimestamp;
  };

  
    return (
      <>
        <div className="mx-auto mt-[20px] px-[20px]">
            <div className="text-left font-inter font-bold text-[#A7A7A7] text-[14px]">
                <p>Transaction Hash:</p>
                <p className="mb-[10px]">{transactionHash}</p>
                <span>Status:</span>
                <span className={`${status==='Success' ? "bg-[#00a186]" : "bg-[#F57B008C]"} ml-[20px] py-[7px] px-[5px] text-[10px] font-syn-regular font-thin text-[white] rounded`}>{status ? status : "Loading..."}</span>
                <p className="mt-[10px]">Block:</p>
                <p>{block}</p>
                <p className="mt-[10px]">Timetamp:</p>
                <p>{formatTimestamp(new Date(timestamp * 1000).toLocaleString())}</p>
                <p className="mt-[10px]">From:</p>
                <p>{fromAddress}</p>
                <p className="mt-[10px]">To:</p>
                <p>{toAddress}</p>
                <p className="mt-[10px]">ERC-20 Tokens Transferred:</p>
                <p className="mt-[10px]">Value:</p>
                <p>0 ETH</p>
                {/* <p className="mt-[10px]">Transaction Fee:</p>
                <p>{transactionFee}</p>
                <p className="mt-[10px]">Gas Price:</p>
                <p>{gasFee}</p> */}
            </div>
        </div>
        
      </>
    );
}

export { Step3 };
