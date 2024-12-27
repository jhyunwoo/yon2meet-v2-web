import Header from "@/app/components/header"
import Image from "next/image"
import TimetableSemester from "@/app/everytime/timetable-semester"

export default function EverytimePage() {
  return (
    <div
      className={
        "w-screen min-h-screen flex flex-col pb-24 pt-16 p-4 items-center justify-center"
      }
    >
      <Header isEverytime={true}>
        <div className={"text-2xl py-4"}>
          에브리타임 시간표 <br />
          업로드하기
        </div>
      </Header>
      <div className={"flex items-center justify-center flex-col gap-2"}>
        <Image
          src={"/everytime.png"}
          alt={"에브리타임 로고"}
          width={200}
          height={200}
        />
        <div
          className={
            "flex flex-col items-center justify-center text-xl font-semibold"
          }
        >
          <p>빠른 시간표 입력을 위해,</p>
          <p>에브리타임 시간표 등록을 지원해요</p>
        </div>
        <div
          className={
            "text-sm flex flex-col gap-1 items-center justify-center text-neutral-600"
          }
        >
          <p>에브리타임 → 시간표 → 톱니바퀴 → 이미지로 저장 후,</p>
          <p>갤러리에서 사진을 업로드해 주세요.</p>
          <p>캡쳐본은 인식이 부정확할 수 있어요.</p>
        </div>
        <TimetableSemester />
      </div>
    </div>
  )
}
