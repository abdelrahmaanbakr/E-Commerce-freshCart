import amazonPay from "../../assets/Images/amazon-pay.png";
import masterCard from "../../assets/Images/mastercard.webp";
import payPal from "../../assets/Images/paypal.png";
import american from "../../assets/Images/American-Express-Color.png";
import appleStore from "../../assets/Images/get-apple-store.png";
import googlePlay from "../../assets/Images/get-google-play.png";

export default function Footer() {
  return (
    <>
      <footer className="bg-slate-100 w-full py-8">
        <div className="container space-y-6">
          <div>
            <h3 className="text-xl font-semibold sm:text-2xl">Get the FreshCart App</h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500 sm:text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At dolore
              aliquid ipsam esse accusantium tempora!
            </p>
          </div>

          <div className="flex flex-col gap-3 border-b border-slate-300 pb-6 sm:flex-row sm:items-center">
            <input
              className="form-control min-h-12 w-full grow"
              type="email"
              placeholder="Email.."
            />
            <button className="btn w-full whitespace-nowrap text-white hover:bg-green-600 cursor-pointer sm:w-auto">
              Share App Link
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold sm:text-2xl">Payment Partners</h3>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <img className="h-8 w-auto sm:h-10" src={amazonPay} alt="Amazon Pay" />
                <img className="h-8 w-auto sm:h-10" src={american} alt="American Express" />
                <img className="h-8 w-auto sm:h-10" src={payPal} alt="PayPal" />
                <img className="h-8 w-auto sm:h-10" src={masterCard} alt="Mastercard" />
              </div>
            </div>

            <div className="space-y-3 lg:justify-self-end">
              <h3 className="text-lg font-semibold sm:text-2xl">Get Deliveries With FreshCart</h3>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:justify-end">
                <img className="h-9 w-auto sm:h-10" src={appleStore} alt="Download on the App Store" />
                <img className="h-9 w-auto sm:h-10" src={googlePlay} alt="Get it on Google Play" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
