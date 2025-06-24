// UserDetails.js
import { CircleCheckBig, CircleChevronRightIcon, Clock, XCircle, AlertCircle, CheckCircle, Play } from "lucide-react";
import React from "react";

const UserDetails = ({ user, formattedDate, setShowUserPanel, onUserSelect }) => {
  
  // Function to get status styling based on ApplicationStatusEnum
  const getStatusStyle = (status) => {
    switch (status) {
      case 1: // applicationStarted
        return {
          bgColor: 'bg-[#2196F333]',
          textColor: 'text-[#2196F3]',
          icon: <Play className="size-4" />,
          label: 'Application Started'
        };
      case 2: // icApplicationCompleted
        return {
          bgColor: 'bg-[#4CAF5033]',
          textColor: 'text-[#35922E]',
          icon: <CircleCheckBig className="size-4" />,
          label: 'IC Application Completed'
        };
      case 3: // icApplicationDeclined
        return {
          bgColor: 'bg-[#F4433633]',
          textColor: 'text-[#F44336]',
          icon: <XCircle className="size-4" />,
          label: 'IC Application Declined'
        };
      case 4: // initiatedIdVerse
        return {
          bgColor: 'bg-[#FF980033]',
          textColor: 'text-[#FF9800]',
          icon: <Clock className="size-4" />,
          label: 'Initiated ID Verification'
        };
      case 5: // idVerseVerificationSuccess
        return {
          bgColor: 'bg-[#4CAF5033]',
          textColor: 'text-[#35922E]',
          icon: <CheckCircle className="size-4" />,
          label: 'ID Verification Success'
        };
      case 6: // idVerseVerificationDecline
        return {
          bgColor: 'bg-[#F4433633]',
          textColor: 'text-[#F44336]',
          icon: <XCircle className="size-4" />,
          label: 'ID Verification Declined'
        };
      case 7: // i2cCompleted
        return {
          bgColor: 'bg-[#4CAF5033]',
          textColor: 'text-[#35922E]',
          icon: <CircleCheckBig className="size-4" />,
          label: 'I2C Completed'
        };
      case 8: // i2cDeclined
        return {
          bgColor: 'bg-[#F4433633]',
          textColor: 'text-[#F44336]',
          icon: <XCircle className="size-4" />,
          label: 'I2C Declined'
        };
      default:
        return {
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-600',
          icon: <AlertCircle className="size-4" />,
          label: 'Unknown Status'
        };
    }
  };

  const statusStyle = getStatusStyle(user.status);

  // Format date for display
  const formatDisplayDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    try {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = String(date.getFullYear()).slice(2);
      return `${day}-${month}-${year}`;
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const handleClick = () => {
    onUserSelect(user);
    setShowUserPanel(true);
  };

  return (
    <div
      className="flex flex-col bg-white max-[380px]:p-1 p-4 rounded-md border border-[#E5E5E5] cursor-pointer hover:shadow-md transition-shadow"
      onClick={handleClick}
    >
      {/* Header with Application ID */}
      <div className="flex justify-between border-b-2 border-[#E5E5E5] pb-1.5">
        <h3 className="max-md:text-[10px] text-xs font-medium">
          Application # {user.id}
        </h3>
        <button>
          <CircleChevronRightIcon className="size-4 text-[#1C1D54]" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex justify-between mt-2">
        {/* User Info */}
        <div className="flex gap-3 items-center">
          <div className="flex items-center justify-center border border-black/20 rounded-full text-[#1C1D54] max-md:w-[25px] w-[40px] max-md:h-[25px] h-[40px] max-md:text-[12px] bg-[#F0F1FE] font-semibold">
            {user.initials || user.fullName?.substring(0, 2).toUpperCase() || 'N/A'}
          </div>
          <div className="flex flex-col">
            <h2 className="text-[12px] min-md:text-[16px] font-semibold text-[#1C1D54]">
              {user.fullName || 'Unknown User'}
            </h2>
            <p className="text-black/60 text-[12px]">{user.email || 'No email provided'}</p>
          </div>
        </div>

        {/* Status and Date */}
        <div>
          <div className="flex flex-col gap-1.5">
            <div className={`${statusStyle.textColor} flex items-center gap-2 py-0.5 px-3 rounded-lg ${statusStyle.bgColor} self-end text-[12px] font-medium`}>
              {statusStyle.icon}
              <span className="whitespace-nowrap">{statusStyle.label}</span>
            </div>
            <p className="text-xs text-black/60 self-end">
              Applied on: {formatDisplayDate(user.appliedDate)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;