import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cloud-services',
  templateUrl: './cloud-services.component.html',
  styleUrls: ['./cloud-services.component.scss'] // ✅ MUST be plural + array
})
export class CloudServicesComponent {
  // your code here...


    cards = [
    {
      title: 'Cloud Migration',
      description: `Move your business applications and workloads to the cloud, eliminating hardware dependencies and improving system resilience. Our migration services ensure minimal downtime, data integrity, and a strategy tailored to your unique business needs.`,
      image: '/assets/images/Cloud-1.png'
    },
    {
      title: 'Cloud Operations and Optimizations',
      description: `Enhance your cloud environment’s performance by fine-tuning operations, identifying inefficiencies, and optimizing resources. Automation and cost-proof management strategies ensure smooth, scalable operations without over-provisioning.`,
      image: '/assets/images/Cloud-2.png'
    },
    {
      title: 'Application Modernization',
      description: `Transform outdated applications with cloud-native features to enhance scalability and user experience. We modernize legacy apps using advanced cloud technologies, enabling seamless integration and improved platform agility.`,
      image: '/assets/images/Cloude-3.png'
    },
    {
      title: 'Data Centre Modernization',
      description: `Revamp your on-premise data centers by integrating cloud technologies, achieving greater storage capacity, and more efficient resource usage. We enable hybrid or fully cloud environments, including hardware refresh, and improving scalability.`,
      image: '/assets/images/Cloude-4.png'
    }
  ];

    cloudTypes = [
    {
      title: 'Public Cloud',
      description:
        'Leverage shared infrastructure from leading providers like AWS, Azure, and Google Cloud to scale rapidly with minimal upfront costs and high availability.',
      image: '/assets/images/Transfrom-1.png'
    },
    {
      title: 'Private Cloud',
      description:
        'Maintain control over your dedicated infrastructure for greater security, compliance, and customization, which is ideal for sensitive data or specific regulatory requirements.',
      image: '/assets/images/Transfrom-2.png'
    },
    {
      title: 'Hybrid Cloud',
      description:
        'Combine the flexibility of the public cloud with the control of the private cloud, allowing seamless data and workload sharing across environments for optimized performance.',
      image: '/assets/images/Transfrom-3.png'
    },
    {
      title: 'Multi-Cloud',
      description:
        'Utilize multiple cloud providers to avoid vendor lock-in, enhance resilience, and optimize costs by strategically deploying workloads based on each provider’s strengths.',
      image: '/assets/images/Transfrom-4.png'
    }
  ];

   stats = [
    {
      value: '80%',
      text: 'of organizations are expected to have transitioned from traditional data centers to cloud solutions.'
    },
    {
      value: '35%',
      text: 'Businesses save, on average, 35% on operational costs after moving to cloud infrastructure.'
    },
    {
      value: '90%',
      text: 'of companies have reported security improvements after migrating to the cloud.'
    }
  ];
    solutionBoxes = [
    {img:'assets/images/cloud_images/Group 174.svg',
      title: 'Robust Data Encryption and Access Controls',
      color: 'blue',
      subtitle: `To safeguard sensitive information, STL implements industry-leading encryption protocols. This ensures that data remains protected from unauthorized access and breaches. Strict access controls are enforced, allowing only authorized accounts to access critical data.`
    },
    { img:'assets/images/cloud_images/Group 174 (1).svg',
      title: 'Automated Backup and Disaster Recovery Solutions',
      color: 'teal',
      subtitle: `STL uses automated backup systems that regularly store data copies in multiple locations. In the event of data loss or corruption, businesses can easily restore operations without significant downtime. Our disaster recovery solutions are designed to meet Recovery Time Objectives (RTO) and Recovery Point Objectives (RPO).`
    },
    {
      img:'assets/images/cloud_images/Group 174 (2).svg',
      title: 'Continuous Monitoring and Threat Detection',
      color: 'green',
      subtitle: `Our cloud solutions incorporate real-time monitoring systems that actively track network activities and data flows. We use advanced analytics and machine learning algorithms to detect anomalies and potential threats before they escalate.`
    },
    {
      img:'assets/images/cloud_images/Group 174 (3).svg',
      title: 'Scalable Infrastructure and Redundancy',
      color: 'orange',
      subtitle: `STL's cloud architecture is built with scalability in mind, allowing businesses to adapt to fluctuating demands without compromising performance. We use redundant systems and failover mechanisms to ensure uninterrupted service.`
    }
  ];

   processBoxes = [
    {img:'assets/images/cloud_images/Group 174 (4).svg',
      title: 'In-Depth Consultation',
      iconType: 'doc', // choose type for icon
      subtitle: `We start by understanding your specific business goals and challenges. Our experts collaborate with you to design a customized cloud strategy that aligns with your objectives, ensuring a smooth transition to the cloud.`
    },
    {
      img:'assets/images/cloud_images/Group 175.svg',
      title: 'Swift Implementation',
      iconType: 'cloud',
      subtitle: `Once the strategy is defined, our team executes a seamless migration to your chosen cloud environment—be it public, private, or hybrid. Leveraging best-in-class tools and methodologies, we ensure your project is delivered on time and within budget.`
    },
    {
      img:'assets/images/cloud_images/Group 176.svg',
      title: 'Smart Optimization',
      iconType: 'doc',
      subtitle: `Post-implementation, we focus on cloud optimization to enhance operational efficiency. Our experts analyze your cloud environment and implement best practices to streamline processes, reduce costs, and improve performance.`
    },
    {
      img:'assets/images/cloud_images/Group 177.svg',
      title: 'Ongoing Support and Evolution',
      iconType: 'cloud',
      subtitle: `We believe in long-term partnerships. Our team provides continuous support and updates, adapting your cloud solutions as your business grows and technology evolves, ensuring you stay ahead of the curve.`
    }
  ];

  cloudPlatforms = [
    { img: 'assets/aws.png', name: 'Amazon Web Services' },
    { img: 'assets/azure.png', name: 'Microsoft Azure' },
    { img: 'assets/gcp.png', name: 'Google Cloud Platform' }
  ];

  containerization = [
    { img: 'assets/docker.png', name: 'Docker' },
    { img: 'assets/kubernetes.png', name: 'Kubernetes' },
    { img: 'assets/cicd.png', name: 'CI/CD Tools' },
    { img: 'assets/jenkins.png', name: 'Jenkins' },
    { img: 'assets/gitlab.png', name: 'GitLab CI/CD' },
    { img: 'assets/circleci.png', name: 'CircleCI' }
  ];

  configManagement = [
    { img: 'assets/terraform.png', name: 'Terraform' },
    { img: 'assets/ansible.png', name: 'Ansible' },
    { img: 'assets/chef.png', name: 'Chef' }
  ];

  monitoringLogging = [
    { img: 'assets/prometheus.png', name: 'Prometheus' },
    { img: 'assets/grafana.png', name: 'Grafana' },
    { img: 'assets/elk.png', name: 'ELK Stack' }
  ];

  collaboration = [
    { img: 'assets/slack.png', name: 'Slack' },
    { img: 'assets/trello.png', name: 'Trello' },
    { img: 'assets/jira.png', name: 'Jira' }
  ];


   industries = [
    {
      title: 'Education',
      description: 'STL creates user-friendly websites for schools and universities that make online learning and communication simple. Our platforms help boost enrolment and keep students and educators connected.',
      image: 'assets/images/education.jpg'
    },
    {
      title: 'Govt Services',
      description: 'STL develops websites for agricultural cooperatives that help farmers communicate and share resources easily. Our platforms strengthen community ties and boost productivity.',
      image: 'assets/images/govt.jpg'
    },
    {
      title: 'Healthcare',
      description: 'STL develops secure, compliant websites for healthcare providers, allowing patients to book appointments and access their medical records easily. This results in better patient experiences and smoother operations.',
      image: 'assets/images/healthcare.jpg'
    },
    {
      title: 'Energy & Utility',
      description: 'STL builds websites for energy companies that keep customers informed with real-time updates and service options. Our solutions improve customer satisfaction and loyalty.',
      image: 'assets/images/energy.jpg'
    }
  ];

   contactForm: FormGroup;
  
    constructor(private fb: FormBuilder) {
      this.contactForm = this.fb.group({
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        projectDescription: ['', Validators.required]
      });
    }
  
    onSubmit() {
      if (this.contactForm.valid) {
        console.log('Form submitted:', this.contactForm.value);
        // Replace with actual API call
      } else {
        this.contactForm.markAllAsTouched();
      }
    }
}
