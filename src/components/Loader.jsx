
import { loader } from '../assets';

const Loader = ({ title }) => (
  <div>
    <div className="w-full justify-center items-center flex-col">
      <img src={loader} alt="loader" className="w-32 g-32 object-contain" />
      <h1 className="font-bold text-2xl text-white mt-2">{title || 'loading...'}</h1>
    </div>
  </div>
);

export default Loader;
