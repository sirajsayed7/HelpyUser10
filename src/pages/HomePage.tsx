import { useState } from 'react'
import { Search, Bell, ChevronRight, MapPin, Star, Bookmark, SlidersHorizontal, Crown, ChevronDown, User, X } from 'lucide-react'
import { StatusBar } from '../components/shared'
import { useNav } from '../context/NavContext'

const ADS = [
  {id:'city', img:'/assets/doha-katara-crescent-hero.png', brand:'Helpy', title:'Your City,', sub:'Our Services', desc:'Book trusted professionals for every need.', service:{provider:'Scrubs Cleaning',name:'General Cleaning',price:'160.00',providerBg:'bg-red-500',providerEmoji:'SC',providerImage:'/assets/scrubs-leaf-logo-clean.png',heroImg:'/assets/scrubs-booking-hero-clean.png'}},
  {id:'heritage', img:'/assets/ai-banner-heritage.jpg', brand:'The Heritage', title:'Up to', sub:'30% OFF', desc:'Flights & Hotels', service:{provider:'The Heritage',name:'Flights & Hotels Package',price:'320.00',providerBg:'bg-indigo-500',providerEmoji:'TH',providerImage:'/assets/ai-banner-heritage.jpg',heroImg:'/assets/ai-banner-heritage.jpg'}},
  {id:'carwash', img:'/assets/ai-banner-sparkle-carwash.jpg', brand:'Sparkle Auto', title:'Premium Wash', sub:'10% OFF', desc:'Foam wash and interior care', service:{provider:'Sparkle Auto Wash',name:'Premium Wash',price:'75.00',providerBg:'bg-blue-500',providerEmoji:'SA',providerImage:'/assets/ai-profile-sparkle-carwash.jpg',heroImg:'/assets/ai-banner-sparkle-carwash.jpg'}},
  {id:'salon', img:'/assets/ai-banner-glow-salon.jpg', brand:'Glow Salon & Spa', title:'Beauty Day', sub:'15% OFF', desc:'Salon and spa treatments', service:{provider:'Glow Salon & Spa',name:'Salon & Spa Package',price:'120.00',providerBg:'bg-pink-500',providerEmoji:'GS',providerImage:'/assets/ai-profile-glow-salon.jpg',heroImg:'/assets/ai-banner-glow-salon.jpg'}},
  {id:'cleaning', img:'/assets/ai-banner-home-cleaning.jpg', brand:'CleanPro Services', title:'Fresh Home', sub:'20% OFF', desc:'Professional home care', service:{provider:'CleanPro Services',name:'Deep Clean',price:'160.00',providerBg:'bg-teal-500',providerEmoji:'CP',providerImage:'/assets/ai-avatar-cleanpro.jpg',heroImg:'/assets/ai-banner-home-cleaning.jpg'}},
]

const HOME_OVERLAY_AD = {
  eyebrow: 'Today only',
  title: 'Fresh Home Reset',
  desc: 'Book CleanPro deep cleaning and get 20% off professional home care.',
  cta: 'Book Deep Clean',
  img: '/assets/ai-banner-home-cleaning.jpg',
  service: {provider:'CleanPro Services',name:'Deep Clean',price:'160.00',providerBg:'bg-teal-500',providerEmoji:'CP',providerImage:'/assets/ai-avatar-cleanpro.jpg',heroImg:'/assets/ai-banner-home-cleaning.jpg'}
}

const HOME_CATS = [
  {id:'digital', label:'Digital', img:'/assets/ai-homecat-digital.png'},
  {id:'education', label:'Education', img:'/assets/ai-homecat-education.png'},
  {id:'car', label:'Car Services', img:'/assets/ai-homecat-car.png'},
  {id:'home', label:'Home Services', img:'/assets/ai-homecat-home_services.png'},
  {id:'delivery', label:'Deliveries', img:'/assets/ai-homecat-delivery.png'},
  {id:'salon', label:'Salon & Spa', img:'/assets/ai-homecat-salon.png'},
  {id:'marketplace', label:'Marketplace', img:'/assets/ai-homecat-market.png'},
  {id:'more', label:'More', img:'/assets/ai-homecat-more.png'},
]

const FEATURED = [
  {provider:'Scrubs', name:'Scrubs Cleaning', tag:'Home Services', from:'160.00 QR', rating:'4.8', reviews:'120', dist:'11.84 KM', img:'/assets/scrubs-hero.png', bg:'bg-red-50', imgFit:'object-cover object-top', service:{provider:'Scrubs Cleaning',name:'General Cleaning',price:'160.00',providerBg:'bg-red-500',providerEmoji:'SC',providerImage:'/assets/scrubs-leaf-logo-clean.png',heroImg:'/assets/scrubs-booking-hero-clean.png'}},
  {provider:'Sparkle Auto', name:'Sparkle Car Wash', tag:'Car Services', from:'45.00 QR', rating:'4.7', reviews:'98', dist:'3.2 KM', img:'/assets/ai-profile-sparkle-carwash.jpg', bg:'bg-blue-50', imgFit:'object-cover object-center', service:{provider:'Sparkle Auto Wash',name:'Premium Wash',price:'75.00',providerBg:'bg-blue-500',providerEmoji:'SA',providerImage:'/assets/ai-profile-sparkle-carwash.jpg',heroImg:'/assets/ai-banner-sparkle-carwash.jpg'}},
  {provider:'Glow Spa', name:'Glow Salon & Spa', tag:'Salon & Spa', from:'120.00 QR', rating:'4.9', reviews:'215', dist:'5.1 KM', img:'/assets/ai-profile-glow-salon.jpg', bg:'bg-pink-50', imgFit:'object-cover object-top', service:{provider:'Glow Salon & Spa',name:'Salon & Spa Package',price:'120.00',providerBg:'bg-pink-500',providerEmoji:'GS',providerImage:'/assets/ai-profile-glow-salon.jpg',heroImg:'/assets/ai-banner-glow-salon.jpg'}},
  {provider:'FreshFold', name:'FreshFold Laundry', tag:'Laundry', from:'35.00 QR', rating:'4.8', reviews:'126', dist:'2.8 KM', img:'/assets/ai-provider-freshfold-real-wallpaper.png', bg:'bg-sky-50', imgFit:'object-cover object-center', service:{provider:'FreshFold Laundry',name:'Wash & Fold',price:'35.00',providerBg:'bg-sky-500',providerEmoji:'FL',providerImage:'/assets/ai-provider-freshfold-real-logo.png',heroImg:'/assets/ai-provider-freshfold-real-wallpaper.png'}},
  {provider:'ByteCare', name:'ByteCare Digital', tag:'Digital', from:'65.00 QR', rating:'4.8', reviews:'134', dist:'Online', img:'/assets/ai-provider-bytecare-digital.png', bg:'bg-cyan-50', imgFit:'object-cover object-center', service:{provider:'ByteCare Digital',name:'Device Setup',price:'65.00',providerBg:'bg-cyan-500',providerEmoji:'BD',providerImage:'/assets/ai-provider-bytecare-digital.png',heroImg:'/assets/ai-provider-bytecare-digital.png'}},
  {provider:'PixelNest', name:'PixelNest Studio', tag:'Digital', from:'180.00 QR', rating:'4.9', reviews:'88', dist:'Online', img:'/assets/ai-provider-pixelnest-studio.png', bg:'bg-violet-50', imgFit:'object-cover object-center', service:{provider:'PixelNest Studio',name:'Website Starter',price:'180.00',providerBg:'bg-violet-500',providerEmoji:'PN',providerImage:'/assets/ai-provider-pixelnest-studio.png',heroImg:'/assets/ai-provider-pixelnest-studio.png'}},
  {provider:'BrightPath', name:'BrightPath Tutors', tag:'Education', from:'95.00 QR', rating:'4.8', reviews:'112', dist:'Online', img:'/assets/ai-provider-brightpath-tutors.png', bg:'bg-amber-50', imgFit:'object-cover object-center', service:{provider:'BrightPath Tutors',name:'Math Tutoring',price:'95.00',providerBg:'bg-amber-500',providerEmoji:'BT',providerImage:'/assets/ai-provider-brightpath-tutors.png',heroImg:'/assets/ai-provider-brightpath-tutors.png'}},
  {provider:'Summit Learning', name:'Summit Learning Hub', tag:'Education', from:'110.00 QR', rating:'4.9', reviews:'76', dist:'Online', img:'/assets/ai-provider-summit-learning.png', bg:'bg-emerald-50', imgFit:'object-cover object-center', service:{provider:'Summit Learning Hub',name:'Exam Prep Session',price:'110.00',providerBg:'bg-emerald-500',providerEmoji:'SL',providerImage:'/assets/ai-provider-summit-learning.png',heroImg:'/assets/ai-provider-summit-learning.png'}},
  {provider:'QuickFix', name:'QuickFix Maintenance', tag:'Maintenance', from:'90.00 QR', rating:'4.8', reviews:'156', dist:'4.4 KM', img:'/assets/ai-avatar-quickfix.jpg', bg:'bg-emerald-50', imgFit:'object-cover object-center', service:{provider:'QuickFix Maintenance',name:'Plumbing Visit',price:'90.00',providerBg:'bg-green-500',providerEmoji:'QF',providerImage:'/assets/ai-avatar-quickfix.jpg'}},
  {provider:'Luxe Beauty', name:'Luxe Beauty Lounge', tag:'Salon & Spa', from:'80.00 QR', rating:'4.8', reviews:'143', dist:'3.8 KM', img:'/assets/ai-avatar-luxe.jpg', bg:'bg-rose-50', imgFit:'object-cover object-center', service:{provider:'Luxe Beauty Lounge',name:'Hair Styling',price:'80.00',providerBg:'bg-rose-500',providerEmoji:'LB',providerImage:'/assets/ai-avatar-luxe.jpg',heroImg:'/assets/ai-banner-glow-salon.jpg'}},
  {provider:'Doha Swift', name:'Doha Swift Delivery', tag:'Deliveries', from:'40.00 QR', rating:'4.7', reviews:'102', dist:'2.6 KM', img:'/assets/ai-homecat-delivery.png', bg:'bg-blue-50', imgFit:'object-contain object-center', service:{provider:'Doha Swift Delivery',name:'Same-day Delivery',price:'40.00',providerBg:'bg-blue-500',providerEmoji:'DS',providerImage:'/assets/ai-homecat-delivery.png',heroImg:'/assets/ai-banner-heritage.jpg'}},
]

const DEALS = [
  {title:'Deep Cleaning', provider:'Scrubs', offer:'25% OFF', price:'180 QR', rating:'4.7 (128)', img:'/assets/ai-banner-home-cleaning.jpg', service:{provider:'Scrubs Cleaning',name:'Deep Cleaning',price:'240.00',providerBg:'bg-red-500',providerEmoji:'SC',providerImage:'/assets/scrubs-leaf-logo-clean.png',heroImg:'/assets/scrubs-booking-hero-clean.png'}},
  {title:'Car Wash', provider:'Sparkle Auto', offer:'30% OFF', price:'35 QR', rating:'4.6 (98)', img:'/assets/ai-banner-sparkle-carwash.jpg', service:{provider:'Sparkle Auto Wash',name:'Basic Wash',price:'45.00',providerBg:'bg-blue-500',providerEmoji:'SA',providerImage:'/assets/ai-profile-sparkle-carwash.jpg',heroImg:'/assets/ai-banner-sparkle-carwash.jpg'}},
  {title:'Tutoring', provider:'BrightPath', offer:'20% OFF', price:'120 QR', rating:'4.8 (215)', img:'/assets/ai-provider-brightpath-tutors.png', service:{provider:'BrightPath Tutors',name:'Math Tutoring',price:'95.00',providerBg:'bg-amber-500',providerEmoji:'BT',providerImage:'/assets/ai-provider-brightpath-tutors.png',heroImg:'/assets/ai-provider-brightpath-tutors.png'}},
  {title:'Salon Package', provider:'Glow Spa', offer:'15% OFF', price:'120 QR', rating:'4.9 (215)', img:'/assets/ai-banner-glow-salon.jpg', service:{provider:'Glow Salon & Spa',name:'Salon & Spa Package',price:'120.00',providerBg:'bg-pink-500',providerEmoji:'GS',providerImage:'/assets/ai-profile-glow-salon.jpg',heroImg:'/assets/ai-banner-glow-salon.jpg'}},
  {title:'Device Setup', provider:'ByteCare', offer:'15% OFF', price:'65 QR', rating:'4.8 (134)', img:'/assets/ai-provider-bytecare-digital.png', service:{provider:'ByteCare Digital',name:'Device Setup',price:'65.00',providerBg:'bg-cyan-500',providerEmoji:'BD',providerImage:'/assets/ai-provider-bytecare-digital.png',heroImg:'/assets/ai-provider-bytecare-digital.png'}},
  {title:'Wash & Fold', provider:'FreshFold', offer:'10% OFF', price:'35 QR', rating:'4.8 (126)', img:'/assets/ai-provider-freshfold-real-wallpaper.png', service:{provider:'FreshFold Laundry',name:'Wash & Fold',price:'35.00',providerBg:'bg-sky-500',providerEmoji:'FL',providerImage:'/assets/ai-provider-freshfold-real-logo.png',heroImg:'/assets/ai-provider-freshfold-real-wallpaper.png'}},
]

const POPULAR_PROVIDERS = [
  {name:'Scrubs', rating:'4.8', img:'/assets/scrubs-leaf-logo-clean.png', service:FEATURED[0].service},
  {name:'Sparkle Auto', rating:'4.7', img:'/assets/ai-profile-sparkle-carwash.jpg', service:FEATURED[1].service},
  {name:'Glow Spa', rating:'4.9', img:'/assets/ai-profile-glow-salon.jpg', service:FEATURED[2].service},
  {name:'FreshFold', rating:'4.8', img:'/assets/ai-provider-freshfold-real-logo.png', service:FEATURED[3].service},
  {name:'ByteCare', rating:'4.8', img:'/assets/ai-provider-bytecare-digital.png', service:FEATURED[4].service},
  {name:'BrightPath', rating:'4.8', img:'/assets/ai-provider-brightpath-tutors.png', service:FEATURED[6].service},
  {name:'QuickFix', rating:'4.8', img:'/assets/ai-avatar-quickfix.jpg', service:FEATURED[8].service},
  {name:'Luxe Beauty', rating:'4.8', img:'/assets/ai-avatar-luxe.jpg', service:FEATURED[9].service},
  {name:'Doha Swift', rating:'4.7', img:'/assets/ai-homecat-delivery.png', service:FEATURED[10].service},
]

const DISCOVERY_FILTERS = ['All','Available today','Top rated','Under 100 QR','Verified','Brings equipment']

const OFFER_EVENTS = [
  {kicker:'Available today', title:'Home care bundles', desc:'Cleaning, laundry, and AC support in one smooth plan.', img:'/assets/ai-banner-home-cleaning.jpg', service:FEATURED[0].service},
  {kicker:'Verified pros', title:'Car refresh week', desc:'Foam wash, polish, and interior care from Sparkle Auto.', img:'/assets/ai-banner-sparkle-carwash.jpg', service:FEATURED[1].service},
  {kicker:'Online help', title:'Digital setup desk', desc:'Device setup, backups, and website launch support.', img:'/assets/ai-provider-bytecare-digital.png', service:FEATURED[4].service},
]

export default function HomePage() {
  const { navigate } = useNav()
  const [activeDiscoveryFilter, setActiveDiscoveryFilter] = useState('All')
  const [showOverlayAd, setShowOverlayAd] = useState(true)
  const visibleFeatured = FEATURED.filter(f => {
    const price = Number.parseFloat(f.from)
    const rating = Number.parseFloat(f.rating)
    if (activeDiscoveryFilter === 'Available today') return f.dist !== 'Online'
    if (activeDiscoveryFilter === 'Top rated') return rating >= 4.8
    if (activeDiscoveryFilter === 'Under 100 QR') return price < 100
    if (activeDiscoveryFilter === 'Brings equipment') return ['Scrubs Cleaning','FreshFold Laundry','Sparkle Car Wash'].includes(f.name)
    return true
  })

  return (
    <div className="relative flex flex-col flex-1 overflow-hidden bg-[#d8edff]">
      <img
        src="/assets/home-wave-background-extra-light-preview.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-top"
        aria-hidden="true"
      />
      <StatusBar />
      <div className="relative z-10 flex-1 overflow-y-auto px-4 pb-28">
        <div className="flex items-center justify-between pt-2 gap-3">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-[58px] h-[58px] rounded-full bg-gradient-to-br from-[#ffd34d] to-[#f7b90f] flex items-center justify-center shadow-sm shrink-0">
              <User size={36} className="text-[#0967ff]" fill="#0967ff" />
            </div>
            <div className="min-w-0">
              <p className="text-[15px] font-bold text-[#6d7192]">Hi, Siraj Sayed</p>
              <h1 className="text-[25px] leading-7 font-black text-black truncate">Welcome to Helpy</h1>
            </div>
          </div>
          <button onClick={()=>navigate('notifications')} className="relative w-12 h-12 rounded-[18px] bg-white shadow-md flex items-center justify-center shrink-0">
            <Bell size={22}/>
            <span className="absolute right-3 top-3 w-2.5 h-2.5 bg-[#0967ff] rounded-full"/>
          </button>
        </div>

        <div className="mt-5 grid grid-cols-[minmax(0,1fr)_auto] gap-3 items-center">
          <button onClick={()=>navigate('location')} className="min-w-0 h-[46px] rounded-[23px] bg-white shadow-sm flex items-center gap-2.5 px-3.5 text-left">
            <span className="relative w-7 h-7 rounded-full bg-[#fff3bf] flex items-center justify-center shrink-0 shadow-sm">
              <MapPin size={20} className="text-[#0967ff] fill-[#0967ff]"/>
              <span className="absolute top-[8px] left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#ffd43b] border border-white"/>
            </span>
            <span className="flex-1 truncate text-[14px] font-semibold">Viva Bahriya 10, The Pearl-Qatar</span>
            <ChevronDown size={18} className="shrink-0"/>
          </button>
          <button onClick={()=>navigate('wallet')} className="h-[46px] rounded-[22px] bg-white border border-[#8cbcff] text-[#0967ff] font-black text-[12px] flex items-center gap-2 px-3.5 whitespace-nowrap">
            <Crown size={16} className="fill-[#0967ff]"/>Join for Free
          </button>
        </div>

        <div className="mt-4 grid grid-cols-[minmax(0,1fr)_52px] gap-3 items-center">
          <div className="h-[46px] rounded-[23px] bg-white shadow-sm flex items-center gap-2.5 px-4 min-w-0">
            <Search size={21} className="shrink-0 text-[#111827]"/>
            <input className="bg-transparent outline-none flex-1 min-w-0 text-[14px] placeholder:text-[#73789b]" placeholder="Search for services, categories..."/>
          </div>
          <button onClick={()=>navigate('categories')} className="w-[46px] h-[46px] rounded-[16px] bg-white shadow-md flex items-center justify-center">
            <SlidersHorizontal size={21} className="text-[#0967ff]"/>
          </button>
        </div>

        <div className="mt-4 overflow-x-auto snap-x snap-mandatory scroll-smooth flex gap-3 no-scrollbar">
          {ADS.map((ad)=> (
            <button key={ad.id} onClick={()=>navigate('service-detail',ad.service)} className="relative shrink-0 snap-center w-full h-[166px] rounded-[20px] overflow-hidden text-left shadow-sm bg-white">
              <img
                src={ad.img}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: ad.id === 'city' ? 'center' : 'center' }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/96 via-white/76 to-white/5"/>
              <div className="relative h-full p-4 text-[#07133d]">
                <p className="text-[23px] leading-[26px] font-black">{ad.title}</p>
                <p className="text-[23px] leading-[26px] font-black">{ad.sub}</p>
                <p className="mt-2 max-w-[185px] text-[13px] leading-[17px] font-bold text-[#36415c]">{ad.desc}</p>
                <span className="absolute left-4 bottom-3 inline-flex px-3.5 py-1.5 rounded-[14px] bg-[#0967ff] text-white text-[12px] font-black shadow-lg shadow-blue-200">Book Now</span>
              </div>
            </button>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-3"><span className="w-2.5 h-2.5 bg-[#0967ff] rounded-full"/><span className="w-2.5 h-2.5 bg-white rounded-full"/><span className="w-2.5 h-2.5 bg-white rounded-full"/><span className="w-2.5 h-2.5 bg-white rounded-full"/></div>

        <SectionTitle title="Categories" onClick={()=>navigate('categories')} />
        <div className="grid grid-cols-4 gap-2.5">
          {HOME_CATS.map(c=>(
            <button key={c.id} onClick={()=>c.id==='more'?navigate('categories'):navigate('category-services',{id:c.id,label:c.label})} className="h-[94px] bg-white rounded-[18px] shadow-sm flex flex-col items-center justify-center gap-1.5 px-1 active:scale-95 transition overflow-hidden">
              <div className="w-[92px] h-[68px] flex items-center justify-center overflow-hidden">
                <img src={c.img} className="w-full h-full object-contain"/>
              </div>
              <p className="text-[12px] leading-[14px] font-bold text-center text-[#111827] line-clamp-2">{c.label}</p>
            </button>
          ))}
        </div>

        <SectionTitle title="Deals for you" onClick={()=>navigate('categories')} />
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {DEALS.map(deal=>(
            <button key={deal.title} onClick={()=>navigate('service-detail',deal.service)} className="relative h-[118px] w-[142px] shrink-0 overflow-hidden rounded-[18px] bg-white text-left shadow-sm active:scale-[0.99] transition">
              <img src={deal.img} className="absolute left-0 top-0 h-[62px] w-full object-cover"/>
              <div className="absolute inset-x-0 top-0 h-[72px] bg-gradient-to-b from-white/0 via-white/15 to-white"/>
              <span className="absolute left-2.5 top-2.5 z-10 rounded-md bg-[#dfff2d] px-1.5 py-0.5 text-[9px] font-black text-[#1d2b00] shadow-sm">{deal.offer}</span>
              <div className="absolute inset-x-0 bottom-0 px-2.5 pb-2.5">
                <p className="truncate text-[12px] font-black text-[#10152f]">{deal.title}</p>
                <p className="text-[10px] text-[#65708a]">from <span className="font-black text-[#0967ff]">{deal.price}</span></p>
                <p className="mt-0.5 text-[10px] font-bold text-[#65708a]"><Star size={10} className="inline fill-yellow-400 text-yellow-400"/> {deal.rating}</p>
              </div>
            </button>
          ))}
        </div>

        <SectionTitle title="Offers & Events" onClick={()=>navigate('categories')} />
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {OFFER_EVENTS.map(item=>(
            <button key={item.title} onClick={()=>navigate('service-detail',item.service)} className="relative h-[116px] w-[252px] shrink-0 overflow-hidden rounded-[20px] bg-white text-left shadow-sm active:scale-[0.99] transition">
              <img src={item.img} className="absolute inset-0 h-full w-full object-cover"/>
              <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-white/10"/>
              <div className="relative h-full p-3.5">
                <p className="inline-flex rounded-full bg-[#dfff2d] px-2 py-0.5 text-[9px] font-black text-[#1d2b00]">{item.kicker}</p>
                <p className="mt-2 max-w-[145px] text-[16px] leading-[18px] font-black text-[#10152f]">{item.title}</p>
                <p className="mt-1 max-w-[155px] text-[10px] leading-[13px] font-bold text-[#65708a]">{item.desc}</p>
              </div>
            </button>
          ))}
        </div>

        <SectionTitle title="Popular providers" onClick={()=>navigate('categories')} />
        <div className="flex gap-2.5 overflow-x-auto pb-2 no-scrollbar">
          {POPULAR_PROVIDERS.map(p=>(
            <button key={p.name} onClick={()=>navigate('service-detail',p.service)} className="w-[88px] shrink-0 rounded-[18px] bg-white p-2 text-center shadow-sm active:scale-95 transition">
              <div className="mx-auto flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-[#f4faff]">
                <img src={p.img} className="h-full w-full object-contain"/>
              </div>
              <p className="mt-1.5 truncate text-[11px] font-black text-[#10152f]">{p.name}</p>
              <p className="text-[10px] font-bold text-[#65708a]"><Star size={10} className="inline fill-yellow-400 text-yellow-400"/> {p.rating}</p>
            </button>
          ))}
        </div>

        <SectionTitle title="Recommended near you" onClick={()=>navigate('categories')} />
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {DISCOVERY_FILTERS.map(filter=>(
            <button key={filter} onClick={()=>setActiveDiscoveryFilter(filter)} className={`shrink-0 h-9 rounded-[17px] px-3.5 text-[12px] font-black shadow-sm transition ${activeDiscoveryFilter===filter?'bg-[#0967ff] text-white':'bg-white text-[#10152f]'}`}>
              {filter}
            </button>
          ))}
        </div>

        <div className="space-y-3 mt-1">
          {visibleFeatured.map(f=>(
            <button key={f.name} onClick={()=>navigate('service-detail',f.service)} className="w-full bg-white rounded-[20px] shadow-sm p-2 flex items-center text-left active:scale-[0.99] transition">
              <div className={`relative w-[116px] h-[88px] rounded-[16px] shrink-0 ${f.bg} flex items-center justify-center overflow-hidden`}>
                <img src={f.img} className={`w-full h-full ${f.imgFit}`}/>
                <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 shadow-sm">
                  <Bookmark size={15}/>
                </span>
              </div>
              <div className="flex-1 pl-3 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-[16px] leading-5 font-black text-[#10152f]">{f.name}</p>
                    <span className="mt-1 inline-block rounded-lg bg-[#e8f2ff] px-2.5 py-0.5 text-[#0967ff] text-[11px] font-bold">{f.tag}</span>
                  </div>
                  <span className="shrink-0 rounded-[14px] bg-[#0967ff] px-4 py-2 text-[12px] font-black text-white">Book</span>
                </div>
                <p className="mt-1.5 text-[11px] text-[#65708a]"><Star size={12} className="inline fill-yellow-400 text-yellow-400"/> {f.rating} ({f.reviews}) <MapPin size={11} className="ml-1 inline"/> {f.dist}</p>
                <p className="mt-1 text-[11px] text-[#65708a]">from</p>
                <p className="text-[18px] leading-5 font-black text-[#0967ff]">{f.from}</p>
                </div>
            </button>
          ))}
          {visibleFeatured.length === 0 && (
            <button onClick={()=>setActiveDiscoveryFilter('All')} className="w-full rounded-[22px] bg-white py-8 text-center text-[14px] font-bold text-[#0967ff] shadow-sm">
              No matches. Clear filter
            </button>
          )}
        </div>
      </div>
      {showOverlayAd && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/35 px-5 backdrop-blur-[2px]">
          <div
            role="button"
            tabIndex={0}
            onClick={()=>navigate('service-detail', HOME_OVERLAY_AD.service)}
            onKeyDown={(e)=>{ if(e.key === 'Enter' || e.key === ' ') navigate('service-detail', HOME_OVERLAY_AD.service) }}
            className="relative w-full max-w-[360px] overflow-hidden rounded-[28px] bg-white text-left shadow-[0_24px_60px_rgba(15,23,42,0.30)] active:scale-[0.99] transition"
          >
            <button
              onClick={(e)=>{e.stopPropagation(); setShowOverlayAd(false)}}
              className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-slate-900 shadow-md"
              aria-label="Close ad"
            >
              <X size={19}/>
            </button>
            <div className="relative h-[190px] overflow-hidden">
              <img src={HOME_OVERLAY_AD.img} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
              <div className="absolute bottom-4 left-4 right-14 text-white">
                <p className="inline-flex rounded-full bg-[#0967ff] px-3 py-1 text-[11px] font-black uppercase tracking-wide">{HOME_OVERLAY_AD.eyebrow}</p>
                <h3 className="mt-2 text-[25px] leading-7 font-black">{HOME_OVERLAY_AD.title}</h3>
              </div>
            </div>
            <div className="p-4">
              <p className="text-[13px] leading-5 font-semibold text-[#5f6780]">{HOME_OVERLAY_AD.desc}</p>
              <span className="mt-4 flex h-12 items-center justify-center rounded-[17px] bg-[#0967ff] text-[15px] font-black text-white shadow-lg shadow-blue-200">
                {HOME_OVERLAY_AD.cta}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function SectionTitle({title,onClick}:{title:string;onClick:()=>void}) {
  return (
    <div className="flex items-center justify-between mt-3 mb-3">
      <h2 className="text-[23px] font-black text-black">{title}</h2>
      <button onClick={onClick} className="flex items-center gap-1 text-[#0967ff] text-[15px] font-bold">View all <ChevronRight size={18}/></button>
    </div>
  )
}
