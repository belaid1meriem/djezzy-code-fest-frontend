import { MapPin, Users, Trophy, LayoutDashboard } from 'lucide-react';
import { InteractiveHoverButton } from '../components/magicui/interactive-hover-button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../components/ui/card"
import { BlurFade } from '../components/magicui/blur-fade';
import Footer from '../components/Footer';
import Header from '../components/Header';

function LandingPage() {
  return (
    <>
      <Header />
      <div className="flex flex-col gap-20">
        {/* Hero Section */}
        <section id='hero' className='flex flex-col gap-8 p-10 py-4 items-center justify-center'>
          <BlurFade delay={0.25} inView>
            <h1 className='md:text-8xl text-4xl font-extrabold text-center py-6'>
              Empowering Communities, <br />  
              <span className='text-primary'>One Volunteer at a Time</span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.5} inView>
            <p className='max-w-prose text-center md:text-2xl py-6'>
              Discover volunteer opportunities, connect with like-minded individuals, 
              and make an impact in your community. Join us today!
            </p>
          </BlurFade>

          <BlurFade inView>
            <InteractiveHoverButton className='my-6'>
              Get Started
            </InteractiveHoverButton>
          </BlurFade>
        </section>

        {/* Features Section */}
        <section id='features' className='bg-primary p-8 pt-40 pb-60 flex flex-col items-center justify-center gap-32 text-center'>
          <BlurFade inView>
            <h1 className='text-5xl pb-20 font-bold text-center text-white'>
              Key Features
            </h1>  
          </BlurFade>

          {/* Interactive Map Feature */}
          <BlurFade className='flex items-center justify-center' inViewMargin='-40%' inView>
            <Card className='lg:w-[50%] w-[80%]'>
              <CardHeader className='flex items-center justify-center flex-col gap-4'>
                <CardTitle className='bg-primary border rounded-full text-white text-2xl h-14 w-14 flex items-center justify-center'>
                  <MapPin />
                </CardTitle>
                <CardTitle className='text-2xl font-semibold'>Find Nearby Events</CardTitle>
              </CardHeader>

              <CardContent>
                <p className='text-center'>
                  Use our interactive map to discover volunteering opportunities near you.
                  Filter by event type, location, and date to find the perfect fit.
                </p>
              </CardContent>
            </Card>
          </BlurFade>

          {/* Social Community Feature */}
          <BlurFade className='flex items-center justify-center' inViewMargin='-40%' inView>
            <Card className='lg:w-[50%] w-[80%]'>
              <CardHeader className='flex items-center justify-center flex-col gap-4'>
                <CardTitle className='bg-primary border rounded-full text-white text-2xl h-14 w-14 flex items-center justify-center'>
                  <Users />
                </CardTitle>
                <CardTitle className='text-2xl font-semibold'>Engage with the Community</CardTitle>
              </CardHeader>

              <CardContent>
                <p className='text-center'>
                  Connect with other volunteers and organizers through our social platform.
                  Share your experiences, post updates, and collaborate on projects.
                </p>
              </CardContent>
            </Card>
          </BlurFade>

          {/* Leaderboard & Rankings Feature */}
          <BlurFade className='flex items-center justify-center' inViewMargin='-40%' inView>
            <Card className='lg:w-[50%] w-[80%]'>
              <CardHeader className='flex items-center justify-center flex-col gap-4'>
                <CardTitle className='bg-primary border rounded-full text-white text-2xl h-14 w-14 flex items-center justify-center'>
                  <Trophy />
                </CardTitle>
                <CardTitle className='text-2xl font-semibold'>Earn Recognition</CardTitle>
              </CardHeader>

              <CardContent>
                <p className='text-center'>
                  Track your volunteer contributions and climb the leaderboard.
                  Earn badges and get recognized for your dedication to the community.
                </p>
              </CardContent>
            </Card>
          </BlurFade>

          {/* Organizer Dashboard Feature */}
          <BlurFade className='flex items-center justify-center' inViewMargin='-40%' inView>
            <Card className='lg:w-[50%] w-[80%]'>
              <CardHeader className='flex items-center justify-center flex-col gap-4'>
                <CardTitle className='bg-primary border rounded-full text-white text-2xl h-14 w-14 flex items-center justify-center'>
                  <LayoutDashboard />
                </CardTitle>
                <CardTitle className='text-2xl font-semibold'>Manage Events with Ease</CardTitle>
              </CardHeader>

              <CardContent>
                <p className='text-center'>
                  Organizers can create, manage, and track events effortlessly through 
                  our advanced dashboard. Ensure smooth event coordination with real-time insights.
                </p>
              </CardContent>
            </Card>
          </BlurFade>
        </section>

        {/* Final Call to Action */}
        <section id='cta' className='py-60 flex flex-col items-center justify-center gap-12 px-10'>
          <BlurFade inView>
            <h1 className='md:text-5xl text-3xl font-bold text-center '>
              Ready to <span className='text-primary'>Make a Difference?</span>
            </h1>  
          </BlurFade>

          <BlurFade delay={0.25} inView>
            <p className='max-w-prose text-center md:text-lg'>
              Join thousands of volunteers and organizations working together to create a 
              lasting impact. Sign up now and start your journey!
            </p>
          </BlurFade>

          <BlurFade delay={0.5} inView>
            <InteractiveHoverButton className='my-6'>
              Get Started
            </InteractiveHoverButton>
          </BlurFade>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default LandingPage;
