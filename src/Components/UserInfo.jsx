// UserInfo.js
import { CircleCheckBig, CircleChevronRightIcon, Clock, XCircle, AlertCircle, CheckCircle, Play, X } from "lucide-react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import sendicon from '../assets/send-2.png';
import React, { useState, useEffect } from "react";

const UserInfo = ({ setShowUserPanel, showUserPanel, user }) => {
  // State for SSN visibility
  const [isSSNVisible, setIsSSNVisible] = useState(false);

  // State for fetched user info
  const [detailedUser, setDetailedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.customerId) return;
    setLoading(true);
    setError(null);
    fetch(`http://172.28.164.11/Customers/GetCustomerById?customerId=${user.customerId}`, {
      method: "POST",
      headers: { accept: "text/plain" },
    })
      .then(res => res.json())
      .then(data => {
        if (data.statusCode === 200) {
          setDetailedUser(data.data);
        } else {
          setError(data.message || "Failed to fetch user details");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Network error");
        setLoading(false);
      });
  }, [user]);

  // Function to mask SSN (show only last 3 digits, mask first 6)
  const getMaskedSSN = (ssn) => {
    if (!ssn) return '';
    // Extract the last 3 digits and mask the first 6
    const lastThree = ssn.slice(-3);
    return `XXX-XXX-${lastThree}`;
  };

  // Function to format SSN with dashes (XXX-XXX-XXX)
  const formatSSN = (ssn) => {
    if (!ssn) return '';
    // Add dashes to format 9-digit SSN as XXX-XXX-XXX
    return ssn.replace(/(\d{3})(\d{3})(\d{3})/, '$1-$2-$3');
  };

  // Function to toggle SSN visibility
  const toggleSSNVisibility = () => {
    setIsSSNVisible(!isSSNVisible);
  };

  const ApplicationStatusEnum =
  {
    applicationStarted: 1,
    icApplicationCompleted: 2,
    icApplicationDeclined: 3,
    initiatedIdVerse: 4,
    idVerseVerificationSuccess: 5,
    idVerseVerificationDecline: 6,
    i2cCompleted: 7,
    i2cDeclined: 8,
  }

  // Function to get status styling and badges
  const getStatusDisplay = (status) => {
    switch (status) {
      case ApplicationStatusEnum.applicationStarted:
        return {
          color: 'text-[#35922E]',
          icon: <Play className="size-3" />,
          badges: [
            { text: 'AS', bgColor: 'bg-[#4CAF5033]', textColor: 'text-[#35922E]' }
          ],
          label: 'Application Started'
        };
      case ApplicationStatusEnum.icApplicationCompleted:
        return {
          color: 'text-[#35922E]',
          icon: <CircleCheckBig className="size-3" />,
          badges: [
            { text: 'IC', bgColor: 'bg-[#4CAF5033]', textColor: 'text-[#35922E]' }
          ],
          label: 'IC Application Completed'
        };
      case ApplicationStatusEnum.icApplicationDeclined:
        return {
          color: 'text-[#F44336]',
          icon: <XCircle className="size-3" />,
          badges: [
            { text: 'IC', bgColor: 'bg-[#F4433633]', textColor: 'text-[#F44336]' }
          ],
          label: 'IC Application Declined'
        };
      case ApplicationStatusEnum.initiatedIdVerse:
        return {
          color: 'text-[#2196F3]',
          icon: <Clock className="size-3" />,
          badges: [
            { text: 'IDV', bgColor: 'bg-[#2196F333]', textColor: 'text-[#2196F3]' }
          ],
          label: 'Initiated ID Verification'
        };
      case ApplicationStatusEnum.idVerseVerificationSuccess:
        return {
          color: 'text-[#35922E]',
          icon: <CheckCircle className="size-3" />,
          badges: [
            { text: 'IDV', bgColor: 'bg-[#4CAF5033]', textColor: 'text-[#35922E]' }
          ],
          label: 'ID Verification Success'
        };
      case ApplicationStatusEnum.idVerseVerificationDecline:
        return {
          color: 'text-[#F44336]',
          icon: <XCircle className="size-3" />,
          badges: [
            { text: 'VD', bgColor: 'bg-[#F4433633]', textColor: 'text-[#F44336]' }
          ],
          label: 'ID Verification Declined'
        };
      case ApplicationStatusEnum.i2cCompleted:
        return {
          color: 'text-[#35922E]',
          icon: <CircleCheckBig className="size-3" />,
          badges: [
            { text: 'IC', bgColor: 'bg-[#4CAF5033]', textColor: 'text-[#35922E]' }
          ],
          label: 'I2C Completed'
        };
      case ApplicationStatusEnum.i2cDeclined:
        return {
          color: 'text-[#F44336]',
          icon: <XCircle className="size-3" />,
          badges: [
            { text: 'ID', bgColor: 'bg-[#F4433633]', textColor: 'text-[#F44336]' }
          ],
          label: 'I2C Declined'
        };
      default:
        return {
          color: 'text-gray-600',
          icon: <AlertCircle className="size-3" />,
          badges: [],
          label: 'Unknown Status'
        };
    }
  };

  // Use detailedUser for display
  if (loading) return <div className="p-4 text-center">Loading user details...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;
  if (!detailedUser) return null;

  // Use detailedUser for status
  const statusDisplay = getStatusDisplay(detailedUser.applicationStatus?.status);

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex w-full bg-white p-3 rounded-md">
        {/* Customer Information Section */}
        <div className="flex flex-col gap-4 w-1/2 px-4 border-r border-black/20">
          <h2 className="text-[#1C1D54] font-semibold text-md">Customer Information</h2>

          <div className="flex flex-col">
            <h2 className="text-[14px] font-medium">Application ID</h2>
            <p className="text-[12px] text-black/60">{detailedUser.id}</p>
          </div>

          <div className="flex flex-col">
            <h2 className="text-[14px] font-medium">Full Name</h2>
            <p className="text-[12px] text-black/60">{detailedUser.fullName}</p>
          </div>

          <div className="flex flex-col">
            <h2 className="text-[14px] font-medium">Date of birth</h2>
            <p className="text-[12px] text-black/60">{detailedUser.customerDetails?.dateOfBirth}</p>
          </div>

          <div className="flex flex-col">
            <h2 className="text-[14px] font-medium">Email</h2>
            <p className="text-[12px] text-black/60">{detailedUser.customerDetails?.email}</p>
          </div>

          <div className="flex flex-col">
            <h2 className="text-[14px] font-medium">Phone Number</h2>
            <p className="text-[12px] text-black/60">{detailedUser.customerDetails?.phone}</p>
          </div>

          <div className="flex flex-col">
            <h2 className="text-[14px] font-medium">Address</h2>
            <p className="text-[12px] text-black/60">
              {detailedUser.customerDetails?.address?.split(', ').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < detailedUser.customerDetails.address.split(', ').length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>

          <div className="flex flex-col">
            <h2 className="text-[14px] font-medium">SSN</h2>
            <div className="flex items-center gap-3">
              <span className="text-[12px] text-black/60">
                {isSSNVisible ? formatSSN(detailedUser.customerDetails?.ssn) : getMaskedSSN(detailedUser.customerDetails?.ssn)}
              </span>
              <div
                onClick={toggleSSNVisibility}
                className="flex items-center justify-center p-1.5 rounded-full border border-black/20 bg-[#2E31921A] cursor-pointer hover:bg-[#2E31922A] transition-colors"
              >
                {isSSNVisible ? (
                  <RiEyeOffFill color="#2E3192" className="size-4" />
                ) : (
                  <RiEyeFill color="#2E3192" className="size-4" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Application Status Section */}
        <div className="relative flex flex-col gap-[18.8px] w-1/2 pl-4">
          <button
            onClick={() => { setShowUserPanel(false) }}
            className="absolute -top-2 -right-2 cursor-pointer text-black/40 hover:text-black/60"
          >
            <X />
          </button>

          <h2 className="text-[#1C1D54] font-semibold text-md">Application Status</h2>

          <div className="flex flex-col">
            <h2 className="text-[14px] font-medium">Status</h2>
            <div className="flex justify-between">
              <div>
                <div className={`flex gap-1 2xl:gap-5 items-center ${statusDisplay.color}`}>
                  <span className="text-[10px] min-[445px]:text-[12px]">
                    {statusDisplay.label}
                  </span>
                  {statusDisplay.icon}
                </div>
              </div>
              <div className="flex gap-1 2xl:gap-8">
                {statusDisplay.badges.map((badge, index) => (
                  <span
                    key={index}
                    className={`text-[10px] 2xl:text-[12px] ${badge.textColor} ${badge.bgColor} px-3 py-0.5 rounded-xl`}
                  >
                    {badge.text}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <h2 className="text-[14px] font-medium">Offer ID</h2>
            <p className="text-[12px] text-black/60">{detailedUser.applicationStatus?.offerId}</p>
          </div>

          <div className="flex flex-col">
            <h2 className="text-[14px] font-medium">IDK Status</h2>
            <p className="text-[12px] text-black/60">{detailedUser.applicationStatus?.idkStatus}</p>
          </div>

          <div className="flex flex-col">
            <h2 className="text-[14px] font-medium">I2C Status</h2>
            <p className="text-[12px] text-black/60">{detailedUser.applicationStatus?.status12C}</p>
          </div>

          <div className="flex flex-col">
            <h2 className="text-[14px] font-medium">APR</h2>
            <p className="text-[12px] text-black/60">{detailedUser.applicationStatus?.apr}</p>
          </div>

          <div className="flex flex-col">
            <h2 className="text-[14px] font-medium">Credit Line</h2>
            <p className="text-[12px] text-black/60">{detailedUser.applicationStatus?.creditLine}</p>
          </div>



          <div className="flex flex-col">
            <h2 className="text-[14px] font-medium">Card Reference ID</h2>
            <p className="text-[12px] text-black/60">{detailedUser.applicationStatus?.creditLine}</p>
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <textarea
        className="bg-white h-20 rounded-md focus:outline focus:outline-[#2E3192] pl-1 pt-1 text-xs text-black/60 resize-none"
        placeholder="Add a note about this application..."
        name=""
        id=""
      ></textarea>

      <button className="flex items-center gap-2 bg-[#2E3192] px-3 py-[10px] rounded-sm self-end text-xs text-white mt-1 hover:bg-[#252980] transition-colors cursor-pointer">
        <span>Add Note</span>
        <img className="size-4" src={sendicon} alt="Send" />
      </button>
    </div>
  );
};

export default UserInfo;