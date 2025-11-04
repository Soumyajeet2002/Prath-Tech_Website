import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface ImpactStat {
  count: string;
  label: string;
  gradient: string;
}

interface Feature {
  icon: string;
  title: string;
  text: string;
}

interface InvestCard {
  title: string;
  subtitle?: string;
  points: string[];
  buttonText: string;
  background?: string;
}

interface whyInvestCard{
  title:string;
  text:string;
}
interface WhyInvestCard_invest{
  title:string;
  text:string;
}

@Component({
  selector: 'app-consultation-services',
  templateUrl: './consultation-services.component.html',
  styleUrls: ['./consultation-services.component.scss']
})
export class ConsultationServicesComponent {



  // confused-about section


      // Main Heading
  confused_about_mainHeading = 'Confused about what your current business needs?';

  // Subtitles
  confused_about_subTitles = [
    `Consulting and managed services each have their place, but you don't need both.`,
    `Find out what your business requires - consultation or managed services in a single session. No commitment—just valuable insights to get you started.`
  ];

  // Button Text
  confused_about_buttonText = 'Claim Your FREE Call With Experts';

  // Image Path
  confused_about_imagePath = 'assets/images/consultation-services/confused-about_bg.svg';





// HIGH IMPACT SCtion



high_impact_titlePart1 = 'High-Impact Outcomes';
  high_impact_titlePart2 = 'That Drive Your Business Growth';

  high_impact_stats: ImpactStat[] = [
    {
    count: '200+',
    label: 'Successful Projects',
    gradient: 'radial-gradient(circle at 30% 30%, #1abc9c, #016a9f)' // Green Glow
  },
  {
    count: '50+',
    label: 'Clients Served',
    gradient: 'radial-gradient(circle at 30% 30%, #e67e22, #d35400)' // Orange Glow
  },
  {
    count: '14+',
    label: 'Years of Experience',
    gradient: 'radial-gradient(circle at 30% 30%, #3498db, #2c3e50)' // Blue Glow
  }
  ];






  // It_managed- section


  it_managed_mainTitle = 'Our IT Managed Services';
  it_managed_description='Our IT-managed services go beyond the break-flx cycle, offering  a resilint IT infrastructure to handle technology comploxities with fully managed or co-managed solutions.'

  it_managed_services=[
    {
      image:'IT-Assignment.png',
      title:'Data Center Services',
      text:'Data is crucial for your business , and manageing it effectively is essential. We offer expert data center management and network infrastructure management, along with disaster recovery services, to keep your operations secure and ensure smooth, uninterrupted business growth.'
    },
    {
      image:'IT-Assignment.png',
      title:'Application Managed services',
      text:'Optimize,evolve,and streamline your applications with our expert application managed services. We focus oon increasing user interaction and driving more conversions to maximize satifaction and boost your profits.'
    },
    {
      image:'IT-Assignment.png',
      title:'Cloud Managed Services',
      text:'Our cloud-managed services ensure business continuty with reiable infracture resuts that keep your operations running consistenly.'
    },
    {
      image:'IT-Assignment.png',
      title:'AI and Automation in Managed Services',
      text:'Increase business agility by reducing tex=diour=s manual task with out AI-driven automation solutions. We streamline operations to enhance efficiency and adaptability. '
    }

  ];



  // our_it

  our_it_mainTitle = 'Our IT Consultation Services';
  our_it_subTitle = 'Decode Challenges, Discover Opportunities';
  our_it_description = `With 15+ years of experience, we add value to your business by decoding challenges, discovering opportunities, and reimagining strategies for long-term growth and innovation.`;

  our_it_services = [
    {
      image: 'IT-Assignment.png',
      title: 'IT Assessments',
      text: `Our team analyzes your current IT environment to identify inefficiencies or vulnerabilities. We check for areas of improvement and prioritize each.`
    },
    {
      image: 'it-strategy.png',
      title: 'IT Strategy & Planning',
      text: `Based on the analysis, we develop strategies and frameworks to align your business goals with the right technology. We create actionable plans for both short-term and long-term objectives.`
    },
    {
      image: 'it-budget.png',
      title: 'IT Budgeting',
      text: `We work with you to develop a realistic IT budget that aligns with your business needs. Our approach ensures cost-effective use of technology for future investments.`
    },
    {
      image: 'risk.png',
      title: 'Security Risk Assessments',
      text: `Our team evaluates your security posture to identify potential risks and vulnerabilities. We provide tailored strategies to strengthen your defenses.`
    }
  ];



  // what-are section


  // Header Titles
  what_are_mainTitle = 'Okay...';
  what_are_strongTitle1 = 'What are Consultation and';
  what_are_strongTitle2 = 'Managed Services?';

  // Subtitles
  what_are_subTitles = [
    'Consultation vs. Managed Services: Make The Right Choice',
    'Consultation vs. Managed Services: The Difference'
  ];

  // Paragraphs
  paragraphs = [
    `Consulting and managed services are different approaches to supporting your business's tech requirements.`,
    `Consulting focuses on providing expert advice, strategies, and fresh insights to optimize your systems without handling the day-to-day tasks required to implement those strategies.`,
    `Managed services, on the other hand, focus on taking over the day-to-day operations of your systems. We advise and execute. It's like having an in-house team but with better expertise and less overhead.`
  ];

  // Image Path
  imagePath = 'assets/images/consultation-services/What_are_consultation-bg.svg';




  // what next section

    consultationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.consultationForm = this.fb.group({
      name: ['', Validators.required],
      company: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      message: ['']
    });
  }

  onSubmit() {
    if (this.consultationForm.valid) {
      console.log('Form Data:', this.consultationForm.value);
      alert('Your request has been submitted!');
      this.consultationForm.reset();
    } else {
      this.consultationForm.markAllAsTouched();
    }
  }



  // when-invest


  when_invest_cards: InvestCard[] = [
    {
      title: 'When Should You Invest in IT Consulting Services?',
      subtitle: 'Our experts can help you if',
      points: [
        'Your business is growing fast and needs IT optimization.',
        'You’re facing frequent tech issues that are affecting operations.',
        'Your IT team lacks skills for complex technologies and new implementations.',
        'You want to streamline workflows with custom software solutions.',
        'You’re planning a digital transformation and need a strategy.'
      ],
      buttonText: 'Our Business Needs IT Consulting Services',
      background: '#F3FAFF' // light blue background
    },
    {
      title: 'When Should You Invest in Managed Services?',
      subtitle: 'Our experts can help you if',
      points: [
        'Your IT team is overwhelmed and can’t focus on core projects.',
        'You need 24/7 monitoring to minimize downtime and resolve issues faster.',
        'You’re struggling with regular security updates and compliance.',
        'You lack resources for an in-house IT department but need reliable management.',
        'You want predictable IT costs and fewer unexpected challenges.'
      ],
      buttonText: 'Our Business Needs Managed Services',
      background: '#E8F7FF' // slightly different blue
    }
  ];



  // why invest


  why_invest_mainTitle = 'Why Invest in Consultation Services?';
  why_invest_subTitle = 'Businesses Are Reaping the Benefits of IT Consultation Services';
  why_invest_description = `The IT consultation market hit USD 906.47 million, reflecting its critical role in business growth.`;

  why_invest_whyInvest: WhyInvestCard_invest[] = [
    {
      title: 'Efficient System in Place',
      text: `Get expert advice on optimizing your workflows, automating tasks, and aligning technology with your business needs for greater efficiency.`
    },
    {
      title: 'Save Costs, Reduce Risks',
      text: `Leverage our IT consultation to identify cost-saving opportunities, implement secure systems, and reduce the risk of costly downtime or data breaches.`
    },
    {
      title: 'Expert Insights',
      text: `Access top-tier tech knowledge and adopt cutting-edge solutions without the headache of training a team.`
    }
  ];


  // why invest managed

  why_invest_managed_mainTitle='Why Invest in Managed Services?';
  why_invest_managed_subTitle='Over 90% of Fortune 500 firms have partnered with miltiple MSPs because:';

  why_invest_managed_whyInvest:whyInvestCard[]=[
    {
      title:'Proactive support',
      text:'monitor and maintain IT services 24/7 , identifying and addressing issues before they escalate.'
    },
    {
      title:' Predictable Costs',
      text:'With a fixed monthly fee, budgeting for IT becomes easer, and srprise expensive are avoided.'
    },
    {
      title:'Scablity',
      text:'Easily adjust IT resources to handle business growth, peak workloads or seasonal demands without extra hassel.'
    }
  ]





  // why stl



  stl_mainTitle = 'Why STL?';

  stl_features: Feature[] = [
    {
      icon: 'Deep.png',
      title: 'Deep Regulatory Knowledge',
      text: `Our team's profound understanding of regulatory requirements ensures your projects are compliant, minimizing risks and avoiding costly delays.`
    },
    {
      icon: 'Deep.png',
      title: 'Improved Efficiency',
      text: `Experience enhanced operational efficiency with our optimized processes and advanced tools, leading to smoother workflows and reduced costs.`
    },
    {
      icon: 'Deep.png',
      title: 'Faster Project Delivery',
      text: `Benefit from our streamlined strategies that accelerate project timelines, deliver results faster, and reduce time to market.`
    },
    {
      icon: 'Deep.png',
      title: 'Tightened Security',
      text: `Trust our robust security measures to protect your data and systems, ensuring a secure environment and safeguarding your assets from potential threats.`
    },
    {
      icon: 'Deep.png',
      title: 'Agile Methodology',
      text: `Our agile approach promotes flexibility and rapid adjustments, keeping your projects aligned with evolving requirements and fostering effective collaboration.`
    },
    {
      icon: 'Deep.png',
      title: 'Quick Onboarding',
      text: `Enjoy a seamless integration with our quick onboarding process, minimizing downtime and ensuring your team is ready to contribute to project success immediately.`
    }
  ];
}



