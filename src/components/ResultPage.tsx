import img from '../assets/images/result_img.svg'
import img1 from '../assets/images/icons/1.svg'
import img2 from '../assets/images/icons/2.svg'
import img3 from '../assets/images/icons/3.svg'
import img4 from '../assets/images/icons/4.svg'
import img5 from '../assets/images/icons/5.svg'
import { generateRandomDate } from '../assets/lib'

const appointmentDetails = [
    {
        icon: img1,
        text: `Scheduled for  ${generateRandomDate(new Date(), new Date(2023, 7, 30))}`
    },
    {
        icon: img2,
        text: `From 10:30 to 10:45`
    },
    {
        icon: img3,
        text: `Consultant will be our care cancellor`
    },
    {
        icon: img4,
        text: `Consultation will be an audio call`
    },
    {
        icon: img5,
        text: `Link sent on your email and whatsapp`
    },
]

export default function ResultPage() {
    return (
        <div className='container'>
            <img className='res_img' src={img} alt="" />
            <h1>Scheduled succesfully!</h1>
            <div className="res_content">
                {appointmentDetails.map((detail, id) =>
                    <div key={id} className="flex">
                        <img src={detail.icon} alt="" />
                        <p>{detail.text}</p>
                    </div>)}
            </div>
        </div>
    )
}