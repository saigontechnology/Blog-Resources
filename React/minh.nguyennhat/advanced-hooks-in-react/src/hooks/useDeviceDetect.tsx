import { useEffect, useState } from "react";

const getDeviceDetect = (userAgent: NavigatorID["userAgent"]) => {
  const isAndroid = () => Boolean(userAgent.match(/Android/i));
  const isIos = () => Boolean(userAgent.match(/iPhone|iPad|iPod/i));
  const isOpera = () => Boolean(userAgent.match(/Opera Mini/i));
  const isWindows = () => Boolean(userAgent.match(/IEMobile/i));
  const isSSR = () => Boolean(userAgent.match(/SSR/i));
  const isMobile = () =>
    Boolean(isAndroid() || isIos() || isOpera() || isWindows());
  const isDesktop = () => Boolean(!isMobile() && !isSSR());
  return {
    isMobile,
    isDesktop,
    isAndroid,
    isIos,
    isSSR,
  };
};

const useDeviceDetect = () => {
  const [agent, setAgent] = useState({
    isMobile: () => Boolean(false),
    isDesktop: () => Boolean(false),
    isAndroid: () => Boolean(false),
    isIos: () => Boolean(false),
    isSSR: () => Boolean(false),
  });

  useEffect(() => {
    const userAgent =
      typeof navigator === "undefined" ? "SSR" : navigator.userAgent;
    setAgent(getDeviceDetect(userAgent));
  }, []);
  return agent;
};

export default useDeviceDetect;
