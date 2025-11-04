import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  socialLinks = [
    { icon: 'fa-brands fa-facebook-f', link: ' /facebook' },
    // { icon: 'fa-brands fa-x-twitter', link: '/twitter' },
    { icon: 'fa-brands fa-linkedin-in', link: '/linkedin' },
    // { icon: 'fa-brands fa-instagram', link: '/instagram' },
    // { icon: 'fa-brands fa-youtube', link: '/youtube' },

    // {Image:'/assets/images/linkedin.png',link:'/linkedin'},
    // {Image:'/assets/images/FB.png',link:'/facebook'},
    // {Image:'/assets/images/insta.png',link:'/instagram'},
    // {Image:'/assets/images/X.png',link:'/twitter'},
    // {Image:'/assets/images/yt.png',link:'/youtube'},
    // { icon: 'fa-brands fa-tiktok', link: '/tiktok' },
  ];

  footerSections = [
    {
      title: 'Company',
      links: [
        // { name: 'Projects', path: '/projects' },
        { name: 'About', path: '/about' },
        { name: 'Career', path: '/career' },
        // , badge: "We're hiring!"
        { name: 'Contact Us', path: '/contact' },
        // { name: 'Insights', path: '/insights' },
        // { name: 'Blog', path: '/blog' },
      ],
    },
    {
      title: 'Services',
      links: [
        { name: 'Website Development', path: '/services' },
        { name: 'App Development', path: '/services' },
        { name: 'Consultation Services', path: '/services' },
        { name: 'Data and Analytics', path: '/services' },
        { name: 'Security Services', path: '/services' },
        { name: 'Cloud Services', path: '/services' },
        { name: 'Emerging Technologies', path: '/services' },
      ],
    },
    {
      title: 'Industries',
      links: [
        { name: 'Education', path: '/industries/education' },
        { name: 'Govt Services', path: '/industries/government' },
        { name: 'Health Care', path: '/industries/healthcare' },
        { name: 'Digital Connect', path: '/industries/digital-connect' },
        { name: 'Public Services', path: '/industries/public-services' },
        { name: 'Energy & Utility', path: '/industries/energy-utility' },
      ],
    },
  ];

  bottomLinks = [
    { name: 'Terms & Conditions', path: '/term-conditions' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Disclaimer', path: '/disclamer' },
    // { name: 'Cancellation and Refund Policy', path: '/refund-policy' },
  ];
}
