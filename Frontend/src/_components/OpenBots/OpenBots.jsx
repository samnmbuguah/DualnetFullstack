import OpenBotBox from '_components/OpenBotBox/OpenBotBox';
import { fetchWrapper } from "_helpers";
const baseUrl = `${fetchWrapper.api_url}/api`;


const OpenBots = ({ bots }) => {

    const handleCloseByProfitChange = async (event) => {
        const value = event.target.value;
        const result = await fetchWrapper.put(baseUrl + "/updateProfitThreshold", {
        profitThreshold: value,
        });
        console.log("result", result);
    }

    return (
      <div className="flex flex-col">
        <div className="mb-3 text-sm flex justify-between items-center text-[#0066CC] font-[inter] font-medium mr-7">
          <label className=" ">open bots</label>
          <div> {bots ? bots.length : 0}</div>
        </div>
        {bots &&
          bots.map((bot, index) => (
            <OpenBotBox key={index} bot={bot} handleCloseByProfitChange={handleCloseByProfitChange} />
          ))}
      </div>
    );
};

export default OpenBots;
