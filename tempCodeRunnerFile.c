#include <stdio.h>

int main() {

    int n,m,count=0,i=0;
    scanf("%d",&n);
    int countA[n];
    while(i<n)
    {
        scanf("%d",&m);
        int a[m];
        for(int i=0;i<m;i++)
        {
            scanf("%d",&a[i]);
        }
        for(int i=0;i<m;i++)
        {
             for(int j=i+1;j<m;j++)
            {
                if(a[i]+a[j]>=a[i]*a[j])
                count++;
            }
        }
        countA[i]=count;
        count=0;
        i++;
    }
 for(int i=0;i<n;i++)
        {
            printf("%d\n",countA[i]);
        }
	// your code goes here
	return 0;
}

