"use client";

import { useNavigate } from "react-router-dom";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

type EnclosureProps = {
  enclosureData: { title: string; description: string; src: string };
  routeLink: string;
};

export function EnclosureCard({ enclosureData, routeLink }: EnclosureProps) {
  const navigate = useNavigate();
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
        <div className="flex flex-col items-center">
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white"
          >
            {enclosureData.title}
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm text-center mt-2 dark:text-neutral-300"
          >
            {enclosureData.description}
          </CardItem>
        </div>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src={enclosureData.src}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-center items-center mt-10">
          <button
            onClick={() => navigate(`/enclosure/${routeLink}`)}
            className="w-full cursor-pointer"
          >
            <CardItem
              translateZ={20}
              as="button"
              className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold cursor-pointer"
            >
              Check Out
            </CardItem>
          </button>
        </div>
      </CardBody>
    </CardContainer>
  );
}
